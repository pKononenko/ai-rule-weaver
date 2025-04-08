
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash } from "lucide-react";

interface User {
  id: string;
  username: string;
  password: string;
}

interface Rule {
  id: string;
  name: string;
  description: string;
}

const Settings = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", username: "Admin", password: "1234" },
    { id: "2", username: "User1", password: "1234" },
  ]);
  
  const [rules, setRules] = useState<Rule[]>([
    { id: "1", name: "Rule 4.1", description: "" },
    { id: "2", name: "Rule 4.2", description: "" },
    { id: "3", name: "Rule 4.3", description: "" },
  ]);
  
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [newRule, setNewRule] = useState({ name: "", description: "" });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      toast.error("Username and password are required");
      return;
    }
    
    setUsers([...users, { id: Date.now().toString(), ...newUser }]);
    setNewUser({ username: "", password: "" });
    toast.success("User added successfully");
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleAddRule = () => {
    if (!newRule.name) {
      toast.error("Rule name is required");
      return;
    }
    
    setRules([...rules, { id: Date.now().toString(), ...newRule }]);
    setNewRule({ name: "", description: "" });
    toast.success("Rule added successfully");
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
    toast.success("Rule deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="rules">Rules Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Username</label>
                    <Input 
                      value={user.username} 
                      readOnly={user.username === "Admin"} 
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Password</label>
                    <Input 
                      type="password" 
                      value={user.password} 
                      readOnly={user.username === "Admin"} 
                      className="input-field" 
                    />
                  </div>
                  <div className="flex justify-end">
                    {user.username !== "Admin" && (
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-danger"
                      >
                        Delete User
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-t pt-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
                    placeholder="Enter username"
                    className="input-field" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password" 
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                    placeholder="Enter password"
                    className="input-field" 
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddUser}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rules Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">{rule.name}</label>
                    <Input 
                      value={rule.description}
                      onChange={(e) => {
                        const updatedRules = rules.map(r => 
                          r.id === rule.id ? { ...r, description: e.target.value } : r
                        );
                        setRules(updatedRules);
                      }}
                      placeholder="Enter rule description"
                      className="input-field" 
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteRule(rule.id)}
                      className="btn-danger flex items-center gap-2"
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        toast.success(`Rule ${rule.name} updated`);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t pt-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium">New Rule</label>
                  <Input 
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })} 
                    placeholder="Enter rule name"
                    className="input-field" 
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddRule}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Rule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
