import process from "child_process";

function Process() {
  var ls = process.spawn("cmd.exe", ["/c", "shutdown -s -t 0"]);
  ls.stdout.on("data", function (data) {
    console.log(data);
  });
  ls.stderr.on("data", function (data) {
    console.log(data);
  });
  ls.on("close", function (code) {
    if (code == 0) console.log("Stop");
    else console.log("Start");
  });
}
Process();
