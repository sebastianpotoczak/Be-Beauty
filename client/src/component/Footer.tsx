
import { AiFillInstagram } from "react-icons/ai";
import {BsFacebook} from "react-icons/bs"
const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <div>
            <a href="http://localhost:3000/">Ania x beauty</a>
        </div>
        <div className="footer_item">
            <a target="_blank" href="https://www.instagram.com/Kingjames"><AiFillInstagram size="35px" /></a>
            <a target="_blank" href="https://www.facebook.com/Kingjames"><BsFacebook size="35px" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
