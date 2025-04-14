
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { saveConnectionConfig, testConnection } from '@/services/databaseService';

// Định nghĩa interface cho các thông tin kết nối
interface ConnectionSettings {
  serverAddress: string;
  databaseName: string;
  username: string;
  password: string;
}

const DatabaseConnection = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const { setDbConnected } = useAdmin();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [settings, setSettings] = useState<ConnectionSettings>({
    serverAddress: '',
    databaseName: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConnect = async () => {
    // Validate input
    if (!settings.serverAddress || !settings.databaseName || !settings.username || !settings.password) {
      toast({
        title: translate('error'),
        description: translate('pleaseEnterAllFields'),
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    toast({
      title: translate('connecting'),
      description: `${settings.serverAddress}/${settings.databaseName}`,
    });

    try {
      // Convert settings to SqlServerConfig format
      const config = {
        server: settings.serverAddress,
        database: settings.databaseName,
        user: settings.username,
        password: settings.password,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        }
      };

      // Save connection config and test it
      saveConnectionConfig(config);
      const connected = await testConnection(config);
      
      setIsConnected(connected);
      setDbConnected(connected);
      
      toast({
        title: connected ? translate('success') : translate('error'),
        description: connected ? translate('connectionSuccess') : translate('connectionFailed'),
        variant: connected ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: translate('error'),
        description: translate('connectionFailed'),
        variant: 'destructive',
      });
      setIsConnected(false);
      setDbConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setDbConnected(false);
    setSettings({
      serverAddress: '',
      databaseName: '',
      username: '',
      password: '',
    });
    toast({
      description: "Disconnected from database",
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
          {translate('databaseConnection')}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {isConnected 
            ? `${translate('connectionSuccess')}: ${settings.serverAddress}/${settings.databaseName}` 
            : translate('serverSettings')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="serverAddress" className="text-gray-300">
                {translate('serverAddress')}
              </Label>
              <Input
                id="serverAddress"
                name="serverAddress"
                value={settings.serverAddress}
                onChange={handleChange}
                placeholder={translate('serverAddressPlaceholder')}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="databaseName" className="text-gray-300">
                {translate('databaseName')}
              </Label>
              <Input
                id="databaseName"
                name="databaseName"
                value={settings.databaseName}
                onChange={handleChange}
                placeholder={translate('databaseNamePlaceholder')}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                {translate('username')}
              </Label>
              <Input
                id="username"
                name="username"
                value={settings.username}
                onChange={handleChange}
                placeholder={translate('usernamePlaceholder')}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                {translate('password')}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={settings.password}
                onChange={handleChange}
                placeholder={translate('passwordPlaceholder')}
                className="bg-gray-700 border-gray-600 text-gray-200"
              />
            </div>
          </>
        ) : (
          <div className="py-4 text-center text-gray-300">
            <div className="text-lg font-medium mb-2">{translate('connectionSuccess')}</div>
            <div className="text-sm text-gray-400 mb-1">{settings.serverAddress}</div>
            <div className="text-sm text-gray-400">{settings.databaseName}</div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {!isConnected ? (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full bg-tech-blue hover:bg-blue-700"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translate('connecting')}
              </>
            ) : (
              translate('connectToServer')
            )}
          </Button>
        ) : (
          <Button 
            onClick={handleDisconnect}
            variant="destructive" 
            className="w-full"
          >
            {translate('disconnect')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DatabaseConnection;
