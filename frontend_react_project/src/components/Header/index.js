import "./index.css"
import techSharthiLogo from "../../public/techSharthiLogo.webp"
const Header=()=>{
    return(
        <div className="header-section">
        <header className="header">
            <img
              className="logo"
              src={techSharthiLogo}
              alt="logo"
            />   
            <h1 className="title gradient-title">techSharthi</h1>
            <span className="subtitle gradient-subtitle">.ai</span>
      </header>
      </div>
    )
}
export default Header