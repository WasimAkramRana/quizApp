Quiz App
=================

This is a start of quiz application using the REST API

Requirements
------------
- **Node**: v6.9.4
- **Express**: 4.15.4
- **mongoose**: 4.11.1

Dependencies
-----------------
- "Express"   : "16.4.3",
- "Node"      : "1.2.0",
- "mongoose"  : "4.11.1"
- "MongoDB"   : "*"

Steps for Installation App
-----------------
- **Step-1 :** First clone the repository run the following command:
```
git clone git@github.com:WasimAkramRana/quizApp.git
```

- **Step-2:** Install all required dependencies to run the following command
```
npm Install
```
- **Step-3:** Create a connection with mongoDB and also create a collection **questions** which uses schema like
```
{
  "question": "String",
  "questionID":"Number",
  "answer":"String",
  "option":[]
}
```

- **Step-4:**
 - run the application with following command
 ```
 node app
 ```

API End Points
----
- **Base URL: /v1**
### 1. getQuizQuestions
  - **Usage**
    - Retrieve the question list for populating dynamic quiz form on UI
  - **Path**
    - **/quiz/questions**
  - **Method**
    - **GET**
  - **Input Variables**
    - **None**
  - **API Response**
    -
    ```
     [{
        "_id": "59b4a7cf5a562409e84f7e90",
        "question": "In which decade with the first transatlantic radio broadcast occur?",
        "questionID": 1,
        "answer": "1900s",
        "options": [
            "1850s",
            "1860s",
            "1870s",
            "1900s"
        ]
    },
    {
        "_id": "59b4a7ef5a562409e84f7e91",
        "question": "Grand Central Terminal, Park Avenue, New York is the world's",
        "answer": "Zaheer",
        "questionID": 2,
        "options": [
            "largest railway station",
            "highest railway station",
            "longest railway station",
            "None of the above"
        ]
    },
    {
        "_id": "59b4a8005a562409e84f7e92",
        "question": "Entomology is the science that studies",
        "questionID": 3,
        "answer": "Insects",
        "options": [
            "Behavior of human beings",
            "Insects",
            "The origin and history of technical and scientific terms",
            "The formation of rocks"
        ]
    },
    {
        "_id": "59b50c955a562409e84f7e96",
        "question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
        "questionID": 4,
        "answer": "Africa",
        "options": [
            "Asia",
            "Africa",
            "Europe",
            "Australia"
        ]
    },
    {
        "_id": "59b50cab5a562409e84f7e97",
        "question": "Garampani sanctuary is located at",
        "questionID": 5,
        "answer": "Diphu, Assam",
        "options": [
            "Junagarh, Gujarat",
            "Diphu, Assam",
            "Kohima, Nagaland",
            "Gangtok, Sikkim"
        ]
    }]
    ```

### 2. qizeSubmit
  - **Usage**
    - Submit the user result
  - **Path**
    - **/form/submit**
  - **Method**
    - **POST**
  - **Input Variables**
    - **MultiChoice** - Select one from multi choice options
      - _Optional_ - No
      - _Type_ - Boolean
      - _In_ - body
      - _Default value_ - None

