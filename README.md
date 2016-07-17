## Synopsis

A 5 days weather forcast based on the http://openweathermap.org/ API.
Created as an Interview excersize.
Show the min/max average for the next 5 days in celsius.

Solution uses ES6, Webpack, AngularJS and Bootstrap (along with a few extra libraries).
Skeleton is based on work I'm doing in my current contract, I've clean it up but there might be a few unnecessery remnants. 

## Installation

After pulling the repository run npm install to download dependencies
Then 'npm run dev' to run a local dev enviroment.
Or 'npm run build' to package the code for deployment

## Usage
accessing the base route will load the weather for London. 
You can control which city is displayed by using /<cityname> to the url

## possible additions:
1. Display the full day view (data already prepared within weatherDetails) of selected item
2. Write tests
3. Probably can make the design look a little prettier
4. Add city search field (instead of manually changing url)

## known bugs:
1. The open weather api seems to return partial results in some cases.
2. Using the query (city name) instead of id is less accurate.
