import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

// get packageName from package.jsonか
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));
const packageName = packageJson.name;

// Define Action in the manifest.json
interface Action {
  name: string;
  type: string;
  parameters: { name: string; type: string; optional?: boolean; default?: string | number }[];
  response: { name: string; type: string }[];
  optional?: boolean;
  // デフォルト値を設定
  default?: string | number;
  commandline: string[];
}

// generateManifest searches for function definitions.
function generateManifest(fileNames: string[], options: ts.CompilerOptions): void {

  // parse ts files
  const program = ts.createProgram(fileNames, options);
  const checker = program.getTypeChecker();

  // initialize manifest
  const manifest = {
    actions: [] as Action[],
    name: packageName
  };

  // search for functions
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  // visit function declarations
  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      // when the function has a name get the symbol
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const details = serializeFunction(symbol);

        // add the function to the manifest
        manifest.actions.push(details);
      }
    }
  }

  // parse function details from symbol
  function serializeFunction(symbol: ts.Symbol): Action {

    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    const signature = type.getCallSignatures()[0];

    // get function parameters
    const parameters = signature.parameters.map((param, _) => {

    // get parameter type
      const paramType = checker.getTypeOfSymbolAtLocation(param, param.valueDeclaration!);

      // check if parameter is optional by checking if it has an initializer
      const isOptional = (param.valueDeclaration as ts.ParameterDeclaration).initializer !== undefined;

      // get default value if it exists
      let defaultValue = (param.valueDeclaration as ts.ParameterDeclaration).initializer?.getText();
      let parsedValue: number | string | undefined = undefined;

      // parse default value
      if (defaultValue) {

        if (/^['"].*['"]$/.test(defaultValue)) {
          // Remove quotes for string literals
          parsedValue = defaultValue.slice(1, -1);
        } else if (!isNaN(Number(defaultValue))) {
          // Convert numeric strings to numbers
          parsedValue = Number(defaultValue);
        }
      }

      return {
        name: param.getName(),
        type: checker.typeToString(paramType),
        optional: isOptional,
        default: parsedValue,
      };
    });

    // generate commandline parameters, however, it is almost fixed for now
    const commandlineParams = parameters.map((param, index) => `%${index + 1}`).join(', ');

    return {
      name: symbol.getName(),
      type: "node",
      parameters: parameters,
      response: [
        {
          name: "json",
          type: "string"
        },
        {
          name: "html",
          type: "string"
        }
      ],
      commandline: [
        `const connector = require('connector');`,
        `return connector.${symbol.getName()}(${commandlineParams});`
      ]
    };
  }

  fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
}

generateManifest(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});