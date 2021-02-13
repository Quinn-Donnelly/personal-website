import React, {Component} from "react";
import './ExperiencePage.css';
import InfoCard from "../../components/InfoCard/InfoCard";

export default class ExperiencePage extends Component<any, any> {
  render() {
    return(
        <div className="experience-page">
          <InfoCard title="Capital One" />
        </div>
    )
  }
}