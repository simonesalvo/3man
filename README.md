# 3man Log file reader
Reading IIS Log file contained into the folder resourceFiles and identify clients ip, 
number of request and client type. Technologies: Angular 1.x, NodeJs, npm, bower. Ide: Idea IJ

# Main idea
The application reads the log file line by line and extract the right information using a regex:

          "([0-9]+\\s\\S\\s)(\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b)\\s(\\S+)"

