/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageHeader,
  PageBlock,
  FloatingActionBar,
  Input,
  InputCurrency,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-apollo'

import SAVE_CONFIG from '../graphql/saveConfig.gql'
import GET_CONFIG from '../graphql/getConfig.gql'

const SettingsComponent = ({ showToast }: any) => {
  const [percentage, setPercentage] = useState('')
  const [maxValue, setMaxValue] = useState(0)

  useQuery(GET_CONFIG, {
    onCompleted: ({
      getConfig: { percentage: newPercentage, maxValue: newMaxValue },
    }) => {
      setPercentage(newPercentage ?? '')
      setMaxValue(newMaxValue ?? 0)
    },
  })
  const [saveConfig, { loading, data, error, called }] = useMutation(
    SAVE_CONFIG
  )

  useEffect(() => {
    if (!loading && called) {
      if (error) {
        console.error(error)
      } else if (data?.saveConfig) {
        showToast('Configuración actualizada')
      } else {
        showToast('No pudimos actualizar la data, intente mas tarde')
      }
    }
  }, [loading, data, error, showToast, called])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-cashback.navigation.label" />}
        />
      }
    >
      <PageBlock>
        <div className="mb5">
          <Input
            placeholder="Porentaje"
            label="Porentaje de cashback"
            value={percentage}
            onChange={(e: any) => setPercentage(e.target.value)}
          />
        </div>
        <div className="mb5">
          <InputCurrency
            label="Retorno maximo"
            placeholder="Valor"
            locale="en-US"
            currencyCode="USD"
            value={maxValue}
            onChange={(e: any) => setMaxValue(e.target.value)}
          />
        </div>
      </PageBlock>
      <FloatingActionBar
        save={{
          label: <FormattedMessage id="admin-cashback.navigation.save" />,
          isLoading: loading,
          onClick: () => {
            saveConfig({ variables: { percentage, maxValue } })
          },
        }}
      />
    </Layout>
  )
}

export default SettingsComponent
