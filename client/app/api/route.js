import { NextResponse } from "next/server";
import { PythonShell } from "python-shell";

export async function POST(req) {
  const data = await req.json();
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: process.env.PYTHON_FILE_PATH || 'C:/Users/Prathamesh/Desktop/hack/Major-Project/alumni-connect/client/app/api/',
    args: [data.flag, data.work_exp || "", data.education || "", data.skills || "", data.search_input || ""]
  };

  const recommendationString = await PythonShell.run('recommendation.py', options).then(message => {
    return message[0];
  });

  const recommendation = recommendationString.split(',');
  return NextResponse.json(recommendation);
}
