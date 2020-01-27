import "../../i18n/i18n";
import React from 'react'
import testChartBuilderJSON from '../../testData/testChartBuilder.json'
import { useTranslation } from "react-i18next";

export default props => {

  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl">DataView Builder</h2>
      <button className="bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2" onClick={e => {
        props.dataViewBuilderAction(testChartBuilderJSON)
      }}>{t('UPDATE CHART')}</button>
    </div>
  )
}
