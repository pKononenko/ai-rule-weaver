
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Save, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const [version, setVersion] = useState("1.1");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [option, setOption] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const projects = [
    "Project #1",
    "Project #2",
    "Project #3",
    "Project #4",
    "Project #5",
    "Project #6",
    "Project #7",
    "Project #8",
    "Project #9",
  ];

  const handleOptionChange = (value: string) => {
    setOption(value);
  };

  const toggleProject = (project: string) => {
    if (selectedProjects.includes(project)) {
      setSelectedProjects(selectedProjects.filter((p) => p !== project));
    } else {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  const selectAll = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects([...projects]);
    }
  };

  const handleTrainModel = () => {
    if (!description) {
      toast.error("Description is required");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Date range is required");
      return;
    }
    if (selectedProjects.length === 0) {
      toast.error("Please select at least one project");
      return;
    }
    if (!option) {
      toast.error("Please select a training option");
      return;
    }

    setIsTraining(true);
    
    // Simulate training process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        setTrainingComplete(true);
        setAccuracy(90);
        toast.success("Model training completed successfully!");
      }
    }, 1000);
  };

  const handleSaveModel = () => {
    toast.success("Model saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Model Training</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="version" className="text-sm font-medium">
                ID / Version
              </label>
              <Input
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter model description"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium">Training Options</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="option1"
                  checked={option === "option1"}
                  onCheckedChange={() => handleOptionChange("option1")}
                />
                <div>
                  <label
                    htmlFor="option1"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Option #1
                  </label>
                  <p className="text-xs text-gray-500">
                    Original dataset + new projects
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="option2"
                  checked={option === "option2"}
                  onCheckedChange={() => handleOptionChange("option2")}
                />
                <div>
                  <label
                    htmlFor="option2"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Option #2
                  </label>
                  <p className="text-xs text-gray-500">
                    Selection from original dataset + new projects
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="option3"
                  checked={option === "option3"}
                  onCheckedChange={() => handleOptionChange("option3")}
                />
                <div>
                  <label
                    htmlFor="option3"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Option #3
                  </label>
                  <p className="text-xs text-gray-500">Only new projects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Select Projects</div>
              <Button
                variant="outline"
                size="sm"
                onClick={selectAll}
                className="text-xs"
              >
                {selectedProjects.length === projects.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project} className="flex items-center space-x-3">
                  <Checkbox
                    id={project}
                    checked={selectedProjects.includes(project)}
                    onCheckedChange={() => toggleProject(project)}
                  />
                  <label
                    htmlFor={project}
                    className="text-sm cursor-pointer"
                  >
                    {project}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {trainingComplete && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Training completed successfully. Accuracy: {accuracy}% on benchmark.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              onClick={handleTrainModel}
              className="btn-primary"
              disabled={isTraining}
            >
              {isTraining ? "Training..." : "Train Model"}
            </Button>
            {trainingComplete && (
              <Button onClick={handleSaveModel} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Model
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
