import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';


class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;
        
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const userAlreadyExists = await usersRepository.findOne({email});
        
        // verify if the user already exists
        if(!userAlreadyExists){
            return response.status(400).json({
                error: "User doesn't exist!"
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({id: survey_id});

        // verify if the survey already exists 
        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "Survey doesn't exist!"
            });
        }

        // Save the information in the table SurveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveysUsersRepository.save(surveyUser);
        // Send the email to the user
        
        return response.json(surveyUser);
    }   
}

export { SendMailController };