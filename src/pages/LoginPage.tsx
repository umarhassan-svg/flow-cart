import LoginForm from "../components/forms/LoginForm"
import Background from "../components/ui/Background"
import Container from "../components/ui/Container"
import logo from "../assets/images/logo2.jpg"
import Nabvar from "../components/Navbar/Navbar"

const LoginPage = () => {
  return (
    <>
    <Nabvar/>
    <Background bgColor="bg-gray-600">
      <Container bgColor="bg-white/90">
        {/* FLEX WRAPPER */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          
          {/* IMAGE LEFT */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src = {logo} 
              alt="Company Logo Image" 
              className="w-200 h-30 object-cover rounded-md shadow-lg  lg:w-400 lg:h-100"
            />
          </div>

          {/* FORM RIGHT */}
          <div className="w-full md:w-1/2">
          <div className="text-3xl font-bold mb-6 text-center">Login to FlowCart</div>
            <LoginForm />
          </div>
        </div>

      </Container>
    </Background>
    </>
  )
}

export default LoginPage
