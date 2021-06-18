import { CashbackConfig, InputCashbackConfig } from '../typings/custom'

export function getConfig(_: any, __: any, ctx: Context) {
  return ctx.clients.vbase
    .getJSON<{ getConfig: CashbackConfig }>(
      process.env.VTEX_APP_NAME ?? '',
      'configs'
    )
    .then((config) => config)
}

export function saveConfig(
  _: any,
  { maxValue, percentage }: InputCashbackConfig,
  ctx: Context
) {
  return ctx.clients.vbase
    .saveJSON(process.env.VTEX_APP_NAME ?? '', 'configs', {
      maxValue,
      percentage,
    })
    .then(() => true)
    .catch(() => false)
}
