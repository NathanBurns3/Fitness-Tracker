interface ProcessEnv {
  NG_APP_API_URL: string;
}

interface Process {
  env: ProcessEnv;
}

declare var process: Process;
