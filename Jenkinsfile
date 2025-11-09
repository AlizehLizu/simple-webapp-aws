pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // ✅ Same as before — Jenkins pulls your GitHub repo
                git branch: 'main', url: 'https://github.com/AlizehLizu/simple-webapp-aws.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // ⚙️ Optional: rebuild if needed, or just echo to mark step complete
                echo 'Skipping image build — using docker-compose with mounted source code instead (Part-II requirement)'
                sh 'echo "No image build required in Part-II"'
            }
        }

        stage('Push to DockerHub') {
            steps {
                // ⚙️ Optional: don’t actually push — only echo for demonstration
                echo 'Skipping DockerHub push — not needed in Part-II'
                sh 'echo "No push required for Part-II assignment"'
            }
        }

        stage('Run Docker Compose') {
            steps {
                // ✅ This stage will actually deploy using the Part-II compose file
                echo 'Starting containerized environment using docker-compose-jenkins.yml'
                sh 'docker-compose -f docker-compose-jenkins.yml down || true'
                sh 'docker-compose -f docker-compose-jenkins.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'Current running containers:'
            sh 'docker ps'
        }
    }
}
