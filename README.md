# Developing a Wordle Game - Haziq

## Project Brief
**MVP - Minimum Viable Product** 
- Built with HTML, CSS and JavaScript
- Use Javascript for DOM manipulation
- Hosted on Github pages
- Commits to Github frequently
- A README.md file with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.
- Be displayed in the browser
- Have some kind of user interaction via mouseclick or keypress

**Stretch Goals (Not Mandatory)**
- Vary the amount of letters
- Complete the Challenger Mode

## Timeframe
2 weeks

## Technologies & Tools Used
- HTML
- CSS
- JavaScript
- Git & GitHub

<br>

## Description
This is a classic [Wordle](https://www.nytimes.com/games/wordle/index.html) game with a tad of flexibility in it. The game was designed and implemented using HTML, CSS, and Javascript while attending the Software Engineering Immersive course at General Assembly.

What started of as an intimate game for his partner, Josh Wardle, a software engineer in Brooklyn, created a guessing game for just the two of them to play. He then slowly introduced it in his family's Whatsapp group before becoming a sensation to the public.

<br>

## High Concept
A simple yet addictive word game. Players have a total of six attempts to guess a hidden word. With each guess, they receive feedback on the accuracy of their letters, helping them deduce the word within the given attempts. 

<br>

## Deployment
The game is deployed on GitHub pages, and you can play the game here: https://chrysaliswoon.github.io/CatrisProject/

<br>

## How To Play
Instructions were taken from the [official Wordle website](https://www.nytimes.com/2022/02/10/crosswords/best-wordle-tips.html
)
The goal of Wordle is to guess the correct word within 6 attempts. Each attempt will hint the player on the letters that exist in the word.

<br>

## Game Architecture
Wordle can be deconstructed into the following components:
- Guessing Board
- Defining Words 
- Cross Referencing with User Input

<br>

## Approach to Development
Using the plan and pseudocodes, I broke down the project into stages:
- [x] **Step 1:** Generate the Guessing Board
- [x] **Step 2:** Create the Game Logic
- [x] **Step 3:** Create the Scoring
- [ ] **Step 4** (Stretch Goal): Diversify the Words' Length

When I was coding out the project, I made a lot of changes to the logic and to how I approach the game. Whilst I tried to make the code clean, it became a lot messier along the way. However, I did learnt alot in the process.

<br>

## Key Learnings
1. Character Limit to a field.

2. Using a lot of for loops to access individual letters in the array for each guess.

3. Resetting the game meant that I need to find all the changes that I had using the game logic and reverse it. That took some time to identify in the code.

4. I learnt to implement an Auto-Tab function! Not important, but I feel like it is handy.

<br>

## Breakdown & Analysis of the Codes
Below is a breakdown and analysis of some of the codes which I have categorised according to the concepts we have covered in class.

### Conditionals, Booleans, Loop

![Conditionals, Booleans, Loops.png](https://github.com/ahzqr/wordle-ga/blob/6007694f3d150fce706f11ad84beee72bd1821b5/Conditionals%2C%20Booleans%2C%20Loops.png)

The above uses a for loop to iterate over the pre-defined word as well as the user input. 
It then proceeds to use conditionals to determine whether the letter exists in the pre-defined word, is at the right index or does not exist at all.
Boolean is then used to determine whether the letters are all the right indexes to proceed with the score or to start over the game.

### Arrays 
An array is a data structure, and like a number or string, you can assign an array to a variable. An array is a list. All list items go between square brackets.

![Arrays](https://github.com/ahzqr/wordle-ga/blob/ae6c85b52dcf08a05b95f483fc630c5bc291effd/Array.png)

For the Wordle, an array can consist of all the pre-defined words. The selected word can then split into an array of letters to cross-reference individually with the user input.

### Functions

![Functions](https://github.com/ahzqr/wordle-ga/blob/fbe00919bc27c69069a2693045379686e0fb7639/Functions.png)

To avoid repeating codes, functions are essential to coding.

<br>

## Future Developments / Improvements

- Make the game more user-friendly and more appealing. 
- Using more efficient codes.

<br>

## Summary
Coding a Wordle game is not as easy as it seems. There goes a lot of logic behind it. 

While it is challenging, I did have fun creating the game and look forward to more challenges in hopes of getting more efficient in coding.
