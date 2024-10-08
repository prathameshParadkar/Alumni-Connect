import google.generativeai as genai
import sys
import json
import re
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import pickle
# Set up the API key
genai.configure(api_key="AIzaSyDocp4FqzjDiLowLliENrJkXx_BIJbaMRw")


# Predefined lists for work experience, skills, and education levels
work_exp_titles = [
    "Web Developer", "Software Engineer", "Data Scientist", "Project Manager", "Product Manager",
    "Business Analyst", "System Administrator", "Machine Learning Engineer", "UX/UI Designer",
    "DevOps Engineer", "Full Stack Developer", "Technical Support Engineer", "Blockchain Developer",
    "Quality Assurance Engineer", "Mobile App Developer", "Network Engineer", "Database Administrator",
    "IT Consultant", "Security Analyst", "Cloud Architect", "Data Analyst", "Embedded Systems Engineer",
    "Hardware Engineer", "Game Developer", "Financial Analyst", "Marketing Manager", "Operations Manager"
]

skills_list = [
    "Python", "JavaScript", "C++", "SQL", "React", "Node.js", "HTML", "CSS", "Docker", "Kubernetes",
    "Machine Learning", "Data Analysis", "Blockchain", "Solidity", "TensorFlow", "AWS", "Azure",
    "Google Cloud", "PostgreSQL", "MongoDB", "MySQL", "Git", "Agile Methodologies", "Figma",
    "Photoshop", "Illustrator", "SEO", "Business Intelligence", "Risk Management", "Excel",
    "Power BI", "Tableau", "Salesforce", "Finance", "Accounting", "Marketing", "Content Writing",
    "Project Management", "Leadership", "Public Speaking", "Data Visualization", "Data Mining"
]

education_levels = ["Undergraduate", "Postgraduate", "Doctorate", "Diploma", "Associate Degree"]

# Helper function to format predefined values
def get_formatted_values(values):
    return ", ".join(values)

# Function to interact with Gemini API and classify text
def classify_text_with_gemini(user_text):
    # Craft the prompt for Gemini API
    prompt = f"""
    Based on the user text provided below, classify the information into the following categories:

    1. *Work experience titles*: Only choose titles from the following list:
    {get_formatted_values(work_exp_titles)}

    2. *Skills*: Only choose skills from the following list:
    {get_formatted_values(skills_list)}

    3. *Education levels*: Only choose the highest education level from the following list:
    {get_formatted_values(education_levels)}

    Here is the user text: "{user_text}"

    Extract the relevant information and return the JSON in the format:
    {{
        "work_exp": "List of work experience titles from the predefined list comma seperated",
        "work_duration": (Duration in months from the text) optional if provided in prompt, otherwise remove,
        "education": "The provided education level from the predefined list",
        "skills": "List of skills from the predefined list comma seperated string"
    }}
    """

    # Use the Gemini model to generate the response
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(prompt)

    # Return the generated result
    return response.text

def extract_with_regex(text):
    # Remove 'json' prefix and extract JSON content
    pattern = r'json\s*(\{[\s\S]*\})'
    match = re.search(pattern, text)
    if match:
        json_str = match.group(1)
        # Parse the extracted JSON string
        data = json.loads(json_str)
        return data
    return None

def recommend_alumni(work_exp, education, skills):

    df = pd.read_csv('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/data.csv')
    #C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/data.csv
    #D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/data.csv
    # df['combined_feature'] = df['work_titles'] + ' ' + df['current_education'] + ' ' + df['skills']
    # vectorizer = TfidfVectorizer()
    # feature_vector = vectorizer.fit_transform(df['combined_feature'])
    vectorizer = joblib.load('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/tfidf_vectorizer.joblib')
    feature_vector = joblib.load('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/feature_vector.joblib')
    student_input = ' '.join([work_exp, education, skills])
    student_fv = vectorizer.transform([student_input])

    similarity = cosine_similarity(student_fv, feature_vector)

    similar_indices = similarity[0].argsort()[::-1]

    recommended_alumni = []
    seen_alumni = set()
    for idx in similar_indices:
        alumni_name = df.iloc[idx]['name']
        if alumni_name not in seen_alumni:
            seen_alumni.add(alumni_name)
            alumni_info = {
                "Name": alumni_name,
                "Linkedin": df.iloc[idx]['linkedin_url'],
                "Work Title": df.iloc[idx]['work_titles'],
                "Education": df.iloc[idx]['current_education'],
                "Skills": df.iloc[idx]['skills']
            }
            recommended_alumni.append(alumni_info)
        if len(recommended_alumni) == 5:
            break
    return recommended_alumni

if __name__ == "__main__":
    flag = sys.argv[1]
    work_exp = sys.argv[2]
    education = sys.argv[3]
    skills = sys.argv[4]
    search_input = sys.argv[5]

    if flag == '0':
        classified_data = classify_text_with_gemini(search_input)
        regex_result = extract_with_regex(classified_data)
        if regex_result:
            work_exp = regex_result['work_exp']
            education = regex_result['education']
            skills = regex_result['skills']
            print(json.dumps(recommend_alumni(work_exp, education, skills)))
        else:
            print("Error extracting data from Gemini response")
    elif flag == '1':
        print(json.dumps(recommend_alumni(work_exp, education, skills)))
    else:
        print("Invalid flag")