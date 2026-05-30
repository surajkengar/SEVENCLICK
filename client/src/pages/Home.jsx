import Navbar from "../Componant/Layout/Navbar.jsx";
import Herosection from "../Componant/section/Herosection.jsx";
import Aboutsection from "../Componant/section/Aboutsection.jsx";
import Servicesection from "../Componant/section/Servicesection.jsx";
import Articlesection from "../Componant/section/Articlesection.jsx";
import Pdfdownloadsection from "../Componant/section/Pdfdownloadsection.jsx";
import Contactsection from "../Componant/section/Contactsection.jsx";
function Home(){
    return <>
        <Navbar />   
        <Herosection/>
        <Aboutsection/>
        <Servicesection />
        <Articlesection/>
        <Pdfdownloadsection/>
        <Contactsection/>
    </>
}
export default Home;