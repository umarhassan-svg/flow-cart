

interface BackgroundProps {
    children: React.ReactNode;
    bgColor?: string;
}

const Background = ({ children, bgColor = "bg-gray-900" }: BackgroundProps) => {
    return (
        <div className={`${bgColor} min-h-screen p-8 items-center`}>
            {children}    
        </div>
    )
}


export default Background