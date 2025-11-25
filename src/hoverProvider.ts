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
      values.push({
        value: '正确数据',
        language: 'markdown',
      });
      values.push({
        value: rules[index].examples.join('\n'),
        language: 'markdown',
      });
      if (rules[index].counterExamples && rules[index].counterExamples?.length) {
        values.push({
          value: '错误数据',
          language: 'markdown',
        });
        values.push({
          value: rules[index].counterExamples.join('\n'),
          language: 'markdown',
        });
      }
      return {
        contents: values,
      };
    }
  }
}
