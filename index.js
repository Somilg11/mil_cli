#!/usr/bin/env node

import * as p from '@clack/prompts';
import color from 'picocolors';
import { setTimeout } from 'timers/promises';

let correctTotal = 0;

async function askQuestion(question, answers, correctAnswerIndex) {
    const options = []
    answers.forEach((answer) => {
        options.push({value: answer, label: answer});
    });

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options: options
    });

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if(answers[correctAnswerIndex] === answer) {
        correctTotal++;
    }
} 

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answers = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

async function main() {
    p.intro(`${color.bgRed(color.black(`Welcome to the ${color.bold('Mils Games')} CLI!✈️`))}`);

    const question1 = new Question('💻Is HTML a language?', ['Yes', 'No'], 1);
    const question2 = new Question('📅When was Javascript created?', ["1940", "2003", "1995", "2010"], 2);
    const question3 = new Question('🔨What is the most popular programming language?', ["Pyhton", "JS", "Java", "C"], 1);
    const question4 = new Question('🌍How many programmers are there in the world?', ["20 million", "17 million", "12 million", "26 million"], 3);

    const allQuestions = [question1, question2, question3, question4];
    const readyToPlay = await p.select({
        message: 'Some questions. Result at the end. Are you ready to play?🚀',
        initialValue: 'Yes',
        options: [
            {value: 'Yes', label: 'Yes'},
            {value: 'No', label: 'No'}
        ]
    });
    if(readyToPlay === 'Yes'){
        for(let i = 0; i < allQuestions.length; i++) {
            await askQuestion(allQuestions[i].question, allQuestions[i].answers, allQuestions[i].correctAnswerIndex);
        }
        p.outro(`${color.bgGreen(color.black(`You got ${color.bold(correctTotal)} out of ${color.bold(allQuestions.length)} questions right!🎉`))}`);

        if(correctTotal === allQuestions.length) {
            const s = p.spinner();
            s.start("Generating gift card code...");
            await setTimeout(5000);
            s.stop();
            p.outro(`${color.bgWhite(color.black(`Code: ${color.bold('programming master')}!👑`))}`);
        } else {
            const s = p.spinner();
            s.start();
            await setTimeout(3000);
            s.stop();
            p.outro(`${color.bgRed(color.black(`You can do better!💪`))}`);
        }
    }
    p.outro(`${color.bgRed(color.black(`Thank you for using the ${color.bold('Mils Games')} CLI!🚀🚀🚀`))}`);
}

main();