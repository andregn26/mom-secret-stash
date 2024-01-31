
type Props = {
  children?: React.ReactNode,
};

export const TemplateAuth = ({ children }: Props) => {
  return (
    <div className="min-h-screen py-6 px-6 flex flex-col justify-center sm:py-12 sm:px-12 ">
      {children}
    </div>
  )
}