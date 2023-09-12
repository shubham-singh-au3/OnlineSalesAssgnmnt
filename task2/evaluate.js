import axios from 'axios';
import pLimit from 'p-limit';

const API_ENDPOINT = 'http://api.mathjs.org/v4/';
const RATE_LIMIT = 50;

const expressions = [
    '2 + 2',
    '3 * 4',
    ' 2 * 4 * 4',
    '5 / (7 - 5)',
    'sqrt(5^2 - 4^2)',
    'sqrt(-3^2 - 4^2)'
];

// Function to make API requests
async function evaluateExpression(expression) {
    try {
        const payload = {
            "expr": expression
          }
          const headers = {
            'Content-Type': 'application/json'
          }
        const response = await axios.post(API_ENDPOINT, payload, {
            headers: headers
          });
        return response.data.result;
    } catch (error) {
        console.error(`Error while evaluating expression ${expression}: ${error.message}`);
        throw error;
    }
}

// Create a rate limiter with the specified rate limit
const limit = pLimit(RATE_LIMIT);

async function main() {
    const results = await Promise.all(
        expressions.map(async (expression) => {
            return limit(() => evaluateExpression(expression));
        })
    );

    //Displaying the results
    for (let i = 0; i < expressions.length; i++) {
        const expression = expressions[i];
        const result = results[i];
        if (result !== null) {
            console.log(`Expression ${expression} with value: ${result}`);
        }
    }
}

main().catch((error) => {
    console.error(`Error: ${error.message}`);
});