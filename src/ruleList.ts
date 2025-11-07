import { BasicList, ListAction, TextEdit, ListItem, window } from 'coc.nvim';
import rules, { Rule } from './rules';
export default class RuleList extends BasicList {
  public readonly name = 'anyRules';
  public readonly description = '常用正则大全';
  public readonly defaultAction = 'open';
  public actions: ListAction[] = [];

  constructor() {
    super();
    this.addAction('open', (item: ListItem) => {
      this.insert(item.data);
    });
  }

  public async insert(rule: Rule) {
    const editor = window.activeTextEditor;
    let range = await window.getCursorPosition();
    const ruleString = String(rule.rule);
    if (editor) {
      await editor.document.applyEdits([TextEdit.insert(range, ruleString)]);
    } else {
      window.showWarningMessage('any-rule: 只有在编辑文本的时候才可以使用!');
    }
  }

  public async loadItems(): Promise<ListItem[]> {
    return rules.map((rule) => {
      return {
        label: rule.title,
        data: rule,
      };
    });
  }
}
