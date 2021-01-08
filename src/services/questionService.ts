import axios, { AxiosError } from 'axios';
import { Question } from '../store/question';
interface OtherProps {
  [key: string]: any;
}

class QuestionService {
  apiClient: any;
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.stackexchange.com/2.2', //can add in env as well
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async getQuestions(filter: string) {
    try {
      let apiPath = `/questions`;
      if (filter) {
        apiPath += `?${filter}`;
      }
      const response = await this.apiClient.get(apiPath);
      if (response.data) {
        let dataParse =
          response.data &&
          response.data.items &&
          response.data.items.map((o: any) => {
            let newItem: OtherProps = {};
            if (o.owner) newItem.author = o.owner.display_name;

            newItem.title = o.title;
            newItem.creationDate = o.creation_date;
            newItem.link = o.link;
            newItem.body = o.body;
            return newItem;
          });
        return { questions: dataParse, hasMore: response.data.has_more };
      }
    } catch (err) {
      if (err && err.response) {
        return err.response;
      }
      throw err;
    }
  }
}

export const questionService = new QuestionService();
