import "../styles/HomePage-style.css";
import resturant from "../images/resturant.jfif";
import { FaUsers, FaCommentDots } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { AiOutlineComment } from "react-icons/ai";

function HomePage() {
  return (
    <div className="page">
      <div className="Home__info">
        <div className="text__cover">
          <h1 data-aos="fade-up" data-aos-duration="2000">
            Share & Find New Places Now{" "}
          </h1>
        </div>
        <div className="images__cover">
          <img
            data-aos="fade-down"
            data-aos-duration="2000"
            className="image1"
            src={resturant}
            alt=""
          />
          <img
            data-aos="zoom-in"
            data-aos-duration="2000"
            className="image2"
            src="https://i.pinimg.com/736x/61/48/e2/6148e2a31adb83c6bc27dcc8e0af02d0.jpg"
            alt=""
          />
          <img
            data-aos="fade-up"
            data-aos-duration="2000"
            className="image3"
            src="https://assets.voxcinemas.com/content/IMAX-LP-BANNERS_3_1525290918.jpg"
            alt=""
          />
        </div>
      </div>
      <hr />
      <div className="content_cover">
        <h1 className="title_home" data-aos="fade-up" data-aos-duration="2000">
          About Us
        </h1>

        <div className="about_us">
          <div data-aos="zoom-in" data-aos-duration="2000">
            <FaUsers className="iconsHome" />
            <p>Connect with friends</p>
          </div>
          <div data-aos="zoom-in" data-aos-duration="2000">
            <MdTimeline className="iconsHome" />
            <p>View Your Timeline</p>
          </div>
          <div data-aos="zoom-in" data-aos-duration="2000">
            <RiUserLocationLine className="iconsHome" />
            <p>Share Your Location</p>{" "}
          </div>
          <div data-aos="zoom-in" data-aos-duration="2000">
            <AiOutlineComment className="iconsHome" />
            <p>Leave a comment</p>
          </div>
        </div>
      </div>
      <hr />

      <h1 className="title_home" data-aos="fade-up" data-aos-duration="2000">
        Contact Us
      </h1>
      <div></div>
    </div>
  );
}

export default HomePage;
