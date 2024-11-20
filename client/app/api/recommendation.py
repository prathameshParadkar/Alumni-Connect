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
work_exp_titles = ['Analyst', 'Andriod Developer Intern', 'Android Developer', 'Ansible Developer', 'App Developer', 'Assistant professor', 'Associate', 'Associate Analyst', 'Associate Consultant', 'Associate Software Engineer', 'Back End Developer', 'Backend Web Developer Intern', 'Business Analyst', 'Business Analyst and Marketing Associate', 'Campaign Manager', 'Campus Ambassador', "Carnival '22", 'Chairperson', 'Co-Founder', 'Consultant', 'Content Curator Intern', 'Content Strategist', 'Core Coordinator', 'Corporate Risk Analyst', 'Creative Head', 'Creatives Head', 'Data Analyst Business Intelligence', 'Data Analyst Intern', 'ET &P SAP Analyst', 'Executive Head', "Executive Head - Sargam'23", 'Executive technology delivery', 'Flutter Developer', 'Freelance Web Developer', 'Frontend Developer', 'Frontend Developer Intern', 'Frontend Web Developer', 'Full Stack Developer', 'Functional Consultant', 'Google Ad Campaign Manager', 'Graduate Analyst', 'Graduate Engineer', 'Graduate Technology Developer', 'Graphic Designer', 'Hardware Engineer', 'Head Of Finance', 'Head Of Marketing', 'Head Of Public Relations', 'Head Of Public Relations - Sargam', 'Head of Department', 'Head of Events', 'Head of Finance and Marketing - Carnival', 'Head of Marketing', 'Head of Marketing: TechRace', 'Head of Operations', 'Head of Public Relations', 'Head of Subcommittee', 'Independent Contractor', 'Industrial Training', 'Information Technology Support Analyst', 'Inplant Trainee', 'Intern', 'Internship', 'Internship Trainee', 'Java Developer', 'Junior Machine Learning Engineer', 'Junior Machine learning engineer', 'MBA Student', 'MERN Stack Developer', 'Machine Learning Intern', 'Manager', 'Marketing and Operations Intern', 'Member Board of Directors', 'Mobile Application Developer', 'Open Source Contributor', 'Penetration Testing Intern', 'Photographer', 'President', 'Project Intern', 'Project Trainee', 'Python Developer Intern', 'Quality Assurance Analyst', 'React Developer', 'Research And Development Intern', 'Research Intern', 'Research and Data Management Intern', 'SDE', 'SDE 2', 'SOC Engineer', 'SWE Intern', 'Secretary', 'Senior Associate', 'Senior Developer', 'Senior Manager', 'Senior NOC Engineer', 'Senior Product Engineer', 'Senior Software Developer', 'Senior Software Engineer', 'Senior Software Engineering Consultant', 'Senior consultant package Implementation', 'Social Media Head', 'Social Media Manager', 'Software Analyst', 'Software Developer', 'Software Developer Intern', 'Software Developer Internship', 'Software Engineer', 'Software Engineer 2', 'Software Engineer II', 'Software Engineer Intern', 'Software Engineering Consultant', 'Software Project Developer', 'Specialist software engineer', 'Sports Coordinator', 'Sr. Software Engineer', 'Staff Consultant', 'Student', 'Student Representative', 'Sub Committee Member', 'Sub-Committee', 'Sub-committee member', 'Subcommittee', 'Subcommittee member', 'Summer Intern', 'Summer Internship', 'Summer Technology Analyst', 'Team Leader', 'Tech Head', 'Tech Intern', 'Tech Team', 'Technical Head', 'Technology Analyst', 'Technology Analyst Intern', 'Technology Consultant', 'Technology Intern', 'Trainee Auxiliary', 'Trainee engineer', 'Training & Placement Coordinator', 'Training And Placement Coordinator', 'Training and Placement Coordinator', 'UI/UX Designer (Intern)', 'Undergraduate Teaching Assistant', 'VLSI Engineer', 'Volunteer', 'Web Developer', 'Web Developer Intern', 'Web Development Intern']

skills_list = ['.NET Framework', 'AMBA', 'AMBA AHB', 'AOSP', 'API Development', 'API Gateways', 'API Testing', 'ASP.NET', 'ASP.NET Core', 'ASP.NET MVC', 'AWS CWI', 'AWS CloudFormation', 'AWS CodePipeline', 'AWS Command Line Interface (CLI)', 'AWS Elastic Beanstalk', 'AWS Glue', 'AWS Identity and Access Management (AWS IAM)', 'AWS IoT', 'AWS Lambda', 'AWS Network firewall', 'AWS SageMaker', 'AWS Transit Gateway', 'AWS VPN', 'AWS WAF', 'Account Management', 'Accounting', 'Active Directory', 'ActiveMQ', 'Adobe Creative Suite', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe XD', 'Advertising', 'After Effects', 'Agile Development', 'Agile Methodologies', 'Agile Project Management', 'Airflow', 'Algorithm Development', 'Algorithm Optimization', 'Algorithms', 'Altium', 'Altium Designer', 'Amazon Cognito', 'Amazon EC2', 'Amazon ECS', 'Amazon QuickSight', 'Amazon Relational Database Service (RDS)', 'Amazon Route 53', 'Amazon S3', 'Amazon VPC', 'Amazon Web Services (AWS)', 'Amplify', 'Analytical Skills', 'Analytics', 'Android', 'Android Automotive', 'Android Design', 'Android Development', 'Android Framework', 'Android Studio', 'Android12', 'Android13', 'Android14', 'Angular', 'AngularJS', 'Annotation', 'Ansible', 'Ansible Scripting', 'Apache', 'Apache Airflow', 'Apache Camel', 'Apache Kafka', 'Apache Spark', 'Apollo GraphQL', 'Application Architecture', 'Application Designing', 'Application Programming Interfaces (API)', 'Architecture', 'Arduino', 'Arduino IDE', 'Ariba', 'Ariba Catalogs', 'Ariba Network', 'Ariba Sourcing', 'Ariba Supplier Lifecycle& Performance Management SLP', 'Artificial Intelligence (AI)', 'Assembly Language', 'Athena', 'Attention to Detail', 'Audio Bring-up', 'Audio Routing', 'Audio driver', 'Auto Scaling', 'AutoCAD', 'Automation', 'Automotive', 'Aws', 'Axios', 'Azure Data Factory', 'Azure SQL', 'Azure blob', 'BI Publisher', 'Back-End Web Development', 'Bash', 'Basic c', 'Behance Presentation', 'Bitbucket', 'Blazemeter', 'Blockchain', 'Bootstrap', 'Bootstrap (Framework)', 'Burp Suite', 'Business', 'Business Analysis', 'Business Development', 'Business Intelligence (BI)', 'Business Management', 'C', 'C (Programming Language)', 'C programming', 'C#', 'C++', 'CSS', 'Calculations', 'Canva', 'Cascading Style Sheets (CSS)', 'Case Study', 'Cash Flow', 'Celery', 'Chatbot Development', 'Cloud Applications', 'Cloud Computing', 'Cloud Security', 'Cloud-Native Applications', 'Cloud-Native Architecture', 'Cluster', 'Code Design', 'Code Review', 'Code base setup', 'Coding Experience', 'Coding Practices', 'Coding Standards', 'Collateral Management', 'Communication', 'Competitive Programming', 'Computer Architecture', 'Computer Engineering', 'Computer Hardware', 'Computer Network Operations', 'Computer Networking', 'Computer Science', 'Computer Vision', 'Concurrent Programming', 'Confluence', 'Container Orchestration', 'Containerization', 'Content Development', 'Continuous Delivery (CD)', 'Continuous Integration (CI)', 'Continuous Integration and Continuous Delivery (CI/CD)', 'Convolutional Neural Networks (CNN)', 'Core Java', 'Creative Design', 'Creative Ideation', 'Creative Writing', 'Creativity Skills', 'Creativity and Innovation', 'Critical Thinking', 'Cryptography', 'Css3', 'Cucumber', 'Customer Service', 'Customization patches', 'Cybersecurity', 'DICOM', 'DSA', 'Dashboards', 'Data Analysis', 'Data Analytics', 'Data Cleaning', 'Data Governance', 'Data Ingestion', 'Data Lakes', 'Data Manipulation', 'Data Migration', 'Data Modeling', 'Data Pipelines', 'Data Research', 'Data Science', 'Data Scraping', 'Data Security', 'Data Structures', 'Data Structures and Algorithms', 'Data Visualization', 'Data Warehousing', 'Database Design', 'Database Development', 'Database Management System (DBMS)', 'Databases', 'Databricks', 'Datasets', 'Debate', 'Debugging', 'Debugging Code', 'Deep Learning', 'Defect Management', 'Defect fixing', 'Dependency Injection', 'Design', 'Design Patterns', 'Design Thinking', 'DevOps', 'DevSecOps', 'Device Drivers', 'Dialogflow', 'Digital Designs', 'Digital Marketing', 'Django', 'Django REST Framework', 'Docker', 'Docker Products', 'Dockers', 'Document Object Model (DOM)', 'Documentation', 'Dynamic Host Configuration Protocol (DHCP)', 'ETL/EAI', 'Economics', 'Elastic Load Balancing', 'Elasticsearch', 'Electrical Troubleshooting', 'Electronic Engineering', 'Electronics', 'Elocution', 'Email Campaigning', 'Email Marketing', 'Emailjs', 'Embedded C', 'Embedded Linux', 'Embedded Systems and Programming', 'Engineering', 'English', 'Entity Framework', 'Entrepreneurship', 'Entrepreneurship Development', 'Ethical Hacking', 'Ethics', 'Event Management', 'Event Planning', 'Express.js', 'ExpressJs', 'Extract', 'FTP', 'FastAPI', 'Field-Programmable Gate Arrays (FPGA)', 'Figma', 'Figma (Software)', 'Finance', 'Financial Analysis', 'Financial Reporting', 'Firebase', 'Flask', 'Flutter', 'FortiNAC', 'Fortianalyzer', 'Fortinet', 'Fortiswitch', 'Framer', 'Front-End Design', 'Front-End Development', 'Front-end Development', 'Full-Stack Development', 'Functional Programming', 'Fundamental Analysis', 'GNS3', 'Gaia', 'GenAI', 'Generative AI', 'Generative AI Tools', 'Git', 'GitHub', 'Gitlab', 'Go (Programming Language)', 'Google Analytics', 'Google BigQuery', 'Google Cloud Platform (GCP)', 'Google Data Studio', 'Google Docs', 'Google Maps', 'Google Maps API', 'Grafana', 'GraphQL', 'Graphic Design', 'Groovy', 'Gujarati', 'HTML', 'HTML5', 'Hardware', 'Hardware Description Language', 'Heroku', 'Hibernate', 'Higher Education', 'Hindi', 'Html css', 'Hyperledger', 'Hyperledger Fabric', 'IBM Operational Decision Manager (ODM)', 'IBM UrbanCode Deploy (uDeploy)', 'IBM Watson', 'IMX8MM', 'IPSec', 'IT Service Management', 'Image Processing', 'Informatica', 'Information Security', 'Information Technology', 'Instruction Set Architecture', 'Integrated Circuits (IC)', 'Integration Testing', 'Internet Information Services (IIS)', 'Internet Protocol (IP)', 'Internet of Things (IoT)', 'Interpersonal Communication', 'Interrupts', 'Interviewing', 'Inventory Management', 'Iptables', 'Ivalua', 'J2EE Application Development', 'JBoss Application Server', 'JBoss ESB', 'JDeveloper', 'JIRA', 'JMeter', 'JPA', 'JSON', 'JSON Web Token (JWT)', 'JUnit', 'Jakarta EE', 'Jakarta Persistence', 'Jasper Reports', 'Java', 'Java 8', 'Java Applets', 'Java Collection Framework', 'Java Database Connectivity (JDBC)', 'Java Development', 'JavaScript', 'JavaScript eXtension (JSX)', 'JavaServer Pages (JSP)', 'Jenkins', 'Jira', 'K-Nearest Neighbors (KNN)', 'Kafka', 'Kafka Streams', 'Keil', 'Kendo Ui', 'Kernel Drivers', 'Knowledge Sharing', 'Kotlin', 'Kubeflow', 'Kubernetes', 'LTSpice', 'LaTeX', 'LabVIEW', 'LabWindows/CVI', 'LangChain', 'Laravel', 'Large Language Models (LLM)', 'Leadership', 'Life Sciences', 'Lightspeed', 'Linear Algebra', 'LinkedIn Learning', 'Linux', 'Linux Command Line', 'Linux Desktop', 'Linux OS', 'Linux driver development', 'Load (ETL)', 'Log Analysis', 'Log4j', 'Logic Gates', 'Logistics Management', 'Looker', 'MATLAB', 'MEAN', 'MERN Stack', 'MS Office', 'Machine Learning', 'Management', 'Management Information Systems (MIS)', 'Manufacturing Process Improvement', 'Marketing', 'Marketing Analytics', 'Marketing Strategy', 'Markup Languages', 'Materialize CSS', 'Mathematics', 'Matlab', 'Maven', 'Mean Stack', 'Media Relations', 'Mentoring', 'Microprocessors', 'Microservices', 'Microsoft Azure', 'Microsoft Excel', 'Microsoft Office', 'Microsoft Power Apps', 'Microsoft Power BI', 'Microsoft Power Query', 'Microsoft PowerPoint', 'Microsoft Products', 'Microsoft SQL Server', 'Microsoft Visual Studio Code', 'Microsoft Word', 'Mobile Application Design', 'Mobile Application Development', 'Mobile Applications', 'Mockito', 'Model Deployment', 'Model Evaluation', 'Model-View-Controller (MVC)', 'MongoDB', 'Motion Graphics', 'Multicloud', 'Multisim simulation software', 'Multithreading', 'MySQL', 'NFC Bring-up', 'Natural Language Processing (NLP)', 'NetBeans', 'Network Administration', 'Network Engineering', 'Network Operations Center (NOC)', 'Network Security', 'Network Troubleshooting', 'Networking', 'Neural Networks', 'Next.js', 'Nexus', 'Nmap', 'NoSQL', 'Node', 'Node.js', 'NumPy', 'Nxp', 'OCI', 'OID', 'OSGi', 'OUD', 'Object Oriented Design', 'Object-Oriented Programming (OOP)', 'Object-Relational Mapping (ORM)', 'Online Research', 'OpenAI Products', 'OpenCV', 'OpenShift', 'Operating Systems', 'Operational Planning', 'Operations Management', 'Oracle Access Manager', 'Oracle BIEE', 'Oracle Database', 'Oracle Enterprise Manager', 'Oracle Identity Manager', 'Oracle SQL Developer', 'Oracle Sql', 'Oracle sql', 'Oral Communication', 'Organization Skills', 'Overleaf', 'P2P', 'PHP', 'PL/SQL', 'PLC Allen Bradley', 'PSD to HTML', 'PaaS', 'Packet Tracer', 'Pandas', 'Pandas (Software)', 'Peer-to-peer Computing', 'Penetration Testing', 'PeopleSoft', 'Photography', 'Playwright', 'PostgreSQL', 'Postman', 'Postman API', 'Postman Api Testing', 'Power Bi', 'PowerPoint', 'PowerShell Script', 'Powershell', 'Presentation Skills', 'Press Releases', 'Problem Solving', 'Product Management', 'Product Requirements', 'Product Security', 'Production Support', 'Programming', 'Programming Languages', 'Project Coordination', 'Project Management', 'Prometheus.io', 'Proteus', 'Proteus software', 'Proxy Server', 'Public Affairs', 'Public Relations', 'Public Speaking', 'PySpark', 'Pygame', 'Python', 'Python (Programming Language)', 'QR', 'Qt', 'Qualitative Research', 'Quality Control', 'Quantitative Analytics', 'Quantitative Finance', 'Quiz', 'RDBMS', 'REST APIs', 'RISC-V', 'ROS', 'RTL Coding', 'RabbitMQ', 'Raspberry Pi', 'React', 'React Native', 'React.js', 'Red Hat Enterprise Linux (RHEL)', 'Redesign Deck', 'Redis', 'Redux', 'Redux.js', 'Regression Testing', 'Relational Databases', 'Reporting & Analysis', 'Representational State Transfer (REST)', 'Requirement Specifications', 'Requirements Analysis', 'Research', 'Research Skills', 'Research and Development (R&D)', 'Responsive Web Design', 'Responsiveness', 'Retrofit', 'S2C', 'SAP Analytics Cloud', 'SAP Basics', 'SAP Basis', 'SAP Business Warehouse (SAP BW)', 'SAP ERP', 'SASS', 'SCADA', 'SDM660', 'SOA BPEL', 'SOAP', 'SQL', 'SQL Server', 'SQL Server Integration Services (SSIS)', 'SQL Server Management Studio', 'SQL Server Reporting Services (SSRS)', 'SQL database design', 'SQLite', 'SRM', 'SSL VPN', 'STS', 'SV', 'SaaS Development', 'Sales', 'Sanity', 'Scala', 'Scalability', 'Schematic', 'Scikit-Learn', 'Scripting', 'Scrum', 'Search Engine Optimization (SEO)', 'Secure Coding', 'Secure Shell (SSH)', 'Security', 'Security Testing', 'Selenium', 'Selenium WebDriver', 'Sense of Humour', 'Sensor Interface', 'Sensor Kernel Driver', 'Sequelize.js', 'Server Side', 'ServiceNow', 'Servlet', 'SharePoint', 'Shell Scripting', 'Snowflake', 'Snowflake Cloud', 'Social Media', 'Social Media Marketing', 'Socket Programming', 'Soft Skills', 'Software Analysis', 'Software Consulting', 'Software Defined Networking', 'Software Design', 'Software Development', 'Software Development Life Cycle (SDLC)', 'Software Documentation', 'Software Projects', 'Software Requirements', 'Software Solutions', 'Solidity', 'Sonarqube', 'Speech Recognition', 'Spinnaker', 'Spring Batch', 'Spring Boot', 'Spring Cloud', 'Spring Data', 'Spring Framework', 'Spring MVC', 'Spring Security', 'Springboot', 'Stata', 'Statistical Analysis', 'Statistical Analysis Tools', 'Statistical Data Analysis', 'Stock Market', 'Storyboarding', 'Strategic Communications', 'Strategic Planning', 'Strategy', 'Style Guides', 'Supply Chain Management', 'Supply Chain Optimization', 'Sybase Products', 'Synopsys tools', 'SystemVerilog', 'Systems Design', 'Tableau', 'Tailwind CSS', 'Tax', 'Teaching', 'Team Building', 'Team Leadership', 'Team Management', 'Teamwork', 'Technical Analysis', 'Technical Architecture', 'Technical Design', 'Technical Documentation', 'Technical Support', 'TensorFlow', 'Terraform', 'Test Automation', 'Testing', 'Time Management', 'Time Series Analysis', 'Tkinter', 'Tomcat', 'Training', 'Transact-SQL (T-SQL)', 'Transform', 'Troubleshooting', 'TypeScript', 'UX Research', 'Ubuntu', 'Ui ux', 'Unit Testing', 'Universal Asynchronous Receiver/Transmitter (UART)', 'Universal Verification Methodology (UVM)', 'Unix', 'User Experience (UX)', 'User Experience Design (UED)', 'User Interface Design', 'User Interface Prototyping', 'User Requirements', 'VMware', 'Vanilla JavaScript', 'Vendor Coordination', 'Verilog', 'Version Control', 'Version Control Tools', 'Very-Large-Scale Integration (VLSI)', 'Vue.js', 'Vulnerability Assessment', 'WAMP', 'Web Application Design', 'Web Application Development', 'Web Applications', 'Web Crawling', 'Web Design', 'Web Development', 'Web Services', 'Web Services API', 'WebLogic', 'Weblogic Administration', 'WiFi & BLE', 'Windows Server', 'Wireframing', 'Wireshark', 'WordPress', 'XHTML', 'XML', 'Yocto Project', 'Zscaler', 'backend and frontend interfacing', 'c', 'css', 'docker', 'fortiap', 'fortimanager', 'gRPC', 'infortainment', 'jQuery', 'java', 'jpa', 'kafka', 'nodejs', 'prometheus', 'swiper']


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

    # df = pd.read_csv('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/data.csv')
    df = pd.read_csv('C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/data.csv')
    #C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/data.csv
    #D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/data.csv
    # df['combined_feature'] = df['work_titles'] + ' ' + df['current_education'] + ' ' + df['skills']
    # vectorizer = TfidfVectorizer()
    # feature_vector = vectorizer.fit_transform(df['combined_feature'])
    # vectorizer = joblib.load('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/tfidf_vectorizer.joblib')
    vectorizer = joblib.load('C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/tfidf_vectorizer.joblib')
    # feature_vector = joblib.load('D:/SPIT SEM 6/Major Project/project/Alumni-Connect/client/app/api/feature_vector.joblib')
    feature_vector = joblib.load('C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/feature_vector.joblib')
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
        if len(recommended_alumni) == 10:
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