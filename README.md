# Holy Guidance (Front-End)

Holy Guidance is an app that provides Bible-based advice and verses for your personal struggles. Using OpenAI's powerful language processing capabilities, Holy Guidance analyzes your input and generates meaningful responses that are rooted in biblical teachings.

With Holy Guidance, you can be sure that the advice and guidance you receive are not only personalized, but also rooted in the timeless wisdom of the Bible. Try it out today and see how it can help you navigate life's challenges.

## Getting Started

To use the application, simply go to the [Holy Guidance website](http://holy-guidance-fe.herokuapp.com/).
Enter your problem or worry into the text box and press "Ask Bible Buddy." The chatbot will respond with a Bible-based advice related to your issue.

## How It Works

Holy Guidance uses OpenAI to generate Bible-based advice. 

When you submit an issue or a question, the app's frontend sends a request to the Flask backend, which in turn creates a customized request to the OpenAI API. OpenAI then processes the request and generates a personalized response that includes Bible-based advice and verses that are relevant to your specific situation.

The Flask backend for Holy Guidance can be found [here](https://github.com/greeshmasunil10/HolyGuidanceBE).

## Development

To contribute to Holy Guidance, follow these steps:

1. Clone the repository using `git clone https://github.com/yourusername/holy-guidance.git`
2. Install the required dependencies using `npm install`
3. Run the development server using `npm start`

## Technologies Used

- Python
- Flask
- React
- OpenAI

## Contributing

Contributions to the Holy Guidance app are welcome! To contribute, follow these steps:

1. Fork this repository
2. Create a new branch: git checkout -b new-feature
3. Make your changes and commit them: git commit -m 'Add some feature'
4. Push to the branch: git push origin new-feature
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
