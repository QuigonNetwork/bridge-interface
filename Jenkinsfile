pipeline {
  agent {
    docker {
     image 'node:16-buster'
    }
  }
  environment {
    CI = 'false'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Setup') {
      steps {
         withChecks('Setup') {
            sh 'rm -rf yarn.lock'
            sh  'yarn'
         }
      }
    }
    stage('Build') {

        steps {
            withChecks('Build') {
                sh 'yarn build'
            }
        }


    }

    stage('Production') {
       steps {
          withChecks('Production') {
              withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
                  s3Delete(bucket: 'test-bucket-replica', path:'**/*')
                  s3Upload(bucket: 'test-bucket-replica', workingDir:'build', includePathPattern:'**/*');
              }
          }
       }
    }
  }
}