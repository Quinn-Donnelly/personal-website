import React, {FunctionComponent} from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
}

const InfoCard: FunctionComponent<InfoCardProps> = ({title}) => {
  return (
      <div className="info-card">
        <header>
          <h2 className="title">{title}</h2>
        </header>
        <main>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, iste, magnam. Aliquid cupiditate doloribus eius error fuga in nemo nisi nobis quidem similique sint soluta sunt veritatis voluptas, voluptatibus. Distinctio?</p>
        </main>
        <footer className="left-footer">
          <div>Last Updated</div>
          <div>01/01/2021</div>
        </footer>
        <footer className="right-footer">
          <button className="outline-button">GitHub</button>
        </footer>
      </div>
  );
}

export default InfoCard;