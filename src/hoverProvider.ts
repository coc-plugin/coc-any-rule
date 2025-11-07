import { HoverProvider, Hover, Position, LinesTextDocument } from 'coc.nvim';
import rules from './rules';
export class RegExpHoverProvider implements HoverProvider {
  constructor() {}

  public async provideHover(
    document: LinesTextDocument,
    position: Position
  ): Promise<Hover | null | undefined> {
    const text = document.lines[position.line];
    const index = rules.findIndex((rule) => {
      const t = String(rule.rule);
      return text.includes(t);
    });
    if (index !== -1) {
      const rule = rules[index];
      if (!rules[index].examples?.length) return;
      let value = `@正则名字\n\n${rule.title}\n\n@正确用例\n\n${rules[index].examples.join('\n')}`;
      if (rules[index].counterExamples && rules[index].counterExamples?.length) {
        value += `\n\n@错误用例\n\n${rules[index].counterExamples.join('\n')} `;
      }
      return {
        contents: [
          {
            value: value,
            language: 'markdown',
          },
        ],
      };
    }
  }
}
