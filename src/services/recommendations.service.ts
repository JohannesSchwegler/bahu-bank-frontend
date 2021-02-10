import { Observable, of } from "rxjs";
import { HTTP_SERVICE_INSTANCE } from "@/services/http.service";

/**
 * Custom Service for Recommendations
 */
class RecommendationsService {
  private userMood: string;
  private objectsInCamera: {
    [key: string]: {
      score: number;
    };
  } = {};
  private allUserMoods: {
    moods: Array<string>;
  };
  private userSpeech: Array<string> = [];
  private state: Record<string, any>;

  evaluateRecomendation() {
    console.log(this.userMood);
    console.log(this.userSpeech);
    console.log(this.objectsInCamera)
  }

  setUserMood = userMood => {
    if (!userMood) return;
    this.userMood = userMood;
    this.evaluateRecomendation();
  };

  addUserSpeech(text: string) {
    this.userSpeech.push(text);
    this.evaluateRecomendation();
  }

  addObjectInCamera(object) {
    const { class: objectName, score } = object;
    if (!this.objectsInCamera[objectName]) {
      this.objectsInCamera[objectName] = {
        score: score
      };
    } else {
      this.objectsInCamera[objectName] = score;
    }
  }

  makeRecommendation() {
    //HTTP_SERVICE_INSTANCE.get("/")
  }
}

const RECOMMENDATIONSERVICE_INSTANCE = new RecommendationsService();

export { RECOMMENDATIONSERVICE_INSTANCE };
