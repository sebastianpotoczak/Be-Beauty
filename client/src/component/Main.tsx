import React from "react";
import thirdPhoto from "./../assets/kwiatek.jpeg";
import secondPhoto from "./../assets/2photo.jpg";
import firstPhoto from "./../assets/vase.jpg";

const Main: React.FC = () => {
  return (
    <>
      <article>
        <div className="contain">
          <div className="first_article">
            <img alt="Plant" src={firstPhoto} />
            <div className="article_contain">
              <div className="article_text">
                <h1>Products</h1>
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </h2>
              </div>
            </div>
          </div>
          <div className="first_article">
            <div className="article_contain">
              <div className="article_text">
                <h1>My studio</h1>
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </h2>
              </div>
            </div>
            <img src={secondPhoto} alt="White room" />
          </div>
          <div className="first_article">
            <img alt="Plant" src={thirdPhoto} />
            <div className="article_contain">
              <div className="article_text">
                <h1>The shop</h1>
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </h2>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Main;
