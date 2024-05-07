pipeline {
  agent any
  stages {
    stage ("Build") {
        steps {
          sh "npm install"
          sh "npm run build"
        }
    }
    stage ("Deploy") {
        steps {
          sh "sudo rm -rf /var/www/react"
          sh "sudo cp -r ${WORKSPACE}/dist/ /var/www/react/"
        }
    }
  }
}