import { useTranslation } from "next-i18next";
import {getStaticPaths, makeStaticProps} from "@/lib/getStatic"

export default function Home() {
  const { t } = useTranslation(['common'])
  console.log("EJEMPLO:", t("ejemplo"))
  return (
    <div className={"place-content-center"}>{t('ejemplo')}</div>
  )
}
const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
