


interface ContainerProps {
    children: React.ReactNode;
    bgColor?: string;
}

const Container = ({ children, bgColor = "bg-white" }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 border rounded-md p-8 ${bgColor}`}>
        {children}
    </div>
  )
}   

export default Container