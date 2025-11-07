import { commands, ExtensionContext, listManager, nvim, languages, workspace } from 'coc.nvim';
import RuleList from './ruleList';
import { RegExpHoverProvider } from './hoverProvider';
export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration();
  if (!config.get('any-rule.enabled')) {
    return;
  }
  context.subscriptions.push(
    listManager.registerList(new RuleList()),
    commands.registerCommand('any-rules', async () => {
      await nvim.command(`CocList anyRules`);
    }),
    languages.registerHoverProvider([{ scheme: 'file', language: '*' }], new RegExpHoverProvider())
  );
}
