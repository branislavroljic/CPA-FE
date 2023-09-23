import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ErrorProps {
  code?: number;
  message?: string;
  explanation?: string;
}

export default function ErrorPage({ code, message, explanation }: ErrorProps) {
  const { t } =  useTranslation();

  return (
    <>
      <div className="min-h-full py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">
              {code || 500}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {message || t("error.defaultMessage")}
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  {explanation || t("error.defaultExplanation")}
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md border border-transparent 
                  bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {t("util.goBackHome")}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export function LoadingErrorPage() {
  const { t } = useTranslation();

  return (
    <ErrorPage
      code={500}
      message={t("util.loadingErrorTitle")}
      explanation={t("util.loadingErrorMessage")}
    />
  );
}
