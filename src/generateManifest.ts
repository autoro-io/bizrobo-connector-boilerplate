import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

// package.jsonからパッケージ名を取得
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));
const packageName = packageJson.name;

// Action型を定義
interface Action {
  name: string;
  type: string;
  parameters: { name: string; type: string; optional?: boolean }[];
  response: { name: string; type: string }[];
  commandline: string[];
}

function generateManifest(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options);
  const checker = program.getTypeChecker();

  const manifest = {
    actions: [] as Action[],
    name: packageName
  };

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const details = serializeFunction(symbol);
        manifest.actions.push(details);
      }
    }
  }

  function serializeFunction(symbol: ts.Symbol): Action {
    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    const signature = type.getCallSignatures()[0];
    const parameters = signature.parameters.map((param, index) => {
      const paramType = checker.getTypeOfSymbolAtLocation(param, param.valueDeclaration!);
      const isOptional = (param.valueDeclaration as ts.ParameterDeclaration).initializer !== undefined;
      return {
        name: param.getName(),
        type: checker.typeToString(paramType),
        optional: isOptional
      };
    });

    const returnType = checker.getReturnTypeOfSignature(signature);
    const commandlineParams = parameters.map((param, index) => `%${index + 1}`).join(', ');

    return {
      name: symbol.getName(),
      type: "node",
      parameters: parameters,
      response: [
        {
          name: "defaultResponse",
          type: checker.typeToString(returnType)
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