# StudyCircle, University Q&A Platform

## Overview

The University Q&A Platform is a website where students can ask questions related to their university courses and get answers from their peers. The platform is organized in categories like university, department, and subject to make it easy for students to find the information they need.

## Features

1. User Registration: Students can register on the platform to ask and answer questions. They will be required to provide their name, email address, university, department, and subjects.

2. Ask Questions: Once registered, students can ask questions related to their university courses by selecting the appropriate department and subject.

3. Answer Questions: Other students can view the questions and provide answers. They can upvote or downvote the answers based on their helpfulness.
   (Reward points to the users providing answers, badges or levels)

   (We can even add the feature like contribution streak(like of github) for better user involvement)

4. Publish Resources: Students can publish their study resources which can be upvoted and downvoted. The resources with the highest upvotes make their way to top results.

5. Search: Students can search for questions and resources by university, department, subject, or keyword.

6. Notifications: Students will receive notifications when someone answers their question or when a new question is posted in their department or subject of interest.(we can even add a feature where students can kind of subscribe to the subject of interest to whether they could get notified from that particular subject or not)

7. Reporting: Users can report questions, answers or resources that violate community guidelines or are inappropriate.

8. Admin Dashboard: An admin dashboard will be available for platform administrators to manage user accounts, questions, and answers. Administrators can review reported content, remove inappropriate content, and block users who violate community guidelines.

## Monetization

1. Premium Accounts: The platform can offer premium accounts with additional features such as ad-free browsing, early access to new features, and priority support.

2. Advertising: The platform can display targeted ads to students based on their university, department, and subjects. E.g. masters college ads for current undergraduate students about to graduate(in the last year) active in the application.

## Tech Stack

Front-end: React, TailwindCSS
Backend:
Real-time Communication: Socket.io

## AI/ML

1. Recommendation System – Recommend top questions/ most asked qns to the students based on their previous qns searching patterns or/and upvotes
   Problem: Needs data of students questions asked to predict/suggest other questions.
2. Spam search query / answer checking – find out spam qns like vulgar words, abuses or even bad or hateful answers too for automated reporting
3. Clustering – cluster different users – needs huge user interaction and user data – best for admin to cluster customers so that they can know customers better and target each cluster(section) of customers with ads, recommendations and many more.

## How to run the program

1. `yarn dev` to start development server
2. `cd pocketbase` `./pocketbase serve` starts the pocketbase server
3. Login id for pocketbase: Sharmakushalbastakoti@gmail.com. Password:gandapuri123
