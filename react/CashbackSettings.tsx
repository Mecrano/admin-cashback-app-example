import React from 'react'
import { ToastProvider, ToastConsumer } from 'vtex.styleguide'

import SettingsComponent from './Components/SettingsComponent'

const CashbackSettings = () => {
  return (
    <ToastProvider positioning="window">
      <ToastConsumer>
        {({ showToast }: any) => <SettingsComponent showToast={showToast} />}
      </ToastConsumer>
    </ToastProvider>
  )
}

export default CashbackSettings
