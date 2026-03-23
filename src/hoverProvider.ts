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
      const values: { value: string; language: string }[] = [];
      values.push({
        value: rule.title,
        language: 'markdown',
      });
      if (rules[index].examples.join('\n').length) {
        values.push({
          value: rules[index].examples.join('\n'),
          language: 'markdown',
        });
      }
      if (rules[index].note) {
        values.push({
          value: rules[index].note,
          language: 'markdown',
        });
      }
      return {
        contents: values,
      };
    }
  }
}
