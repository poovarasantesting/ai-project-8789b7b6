import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ColorCode {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  category: string;
}

export default function ColorCodes() {
  const { toast } = useToast();

  const colorGroups = [
    {
      category: "Basic Colors",
      colors: [
        { name: "Black", hex: "#000000", rgb: "rgb(0, 0, 0)", hsl: "hsl(0, 0%, 0%)" },
        { name: "White", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", hsl: "hsl(0, 0%, 100%)" },
        { name: "Red", hex: "#FF0000", rgb: "rgb(255, 0, 0)", hsl: "hsl(0, 100%, 50%)" },
        { name: "Green", hex: "#00FF00", rgb: "rgb(0, 255, 0)", hsl: "hsl(120, 100%, 50%)" },
        { name: "Blue", hex: "#0000FF", rgb: "rgb(0, 0, 255)", hsl: "hsl(240, 100%, 50%)" },
        { name: "Yellow", hex: "#FFFF00", rgb: "rgb(255, 255, 0)", hsl: "hsl(60, 100%, 50%)" },
        { name: "Cyan", hex: "#00FFFF", rgb: "rgb(0, 255, 255)", hsl: "hsl(180, 100%, 50%)" },
        { name: "Magenta", hex: "#FF00FF", rgb: "rgb(255, 0, 255)", hsl: "hsl(300, 100%, 50%)" },
      ]
    },
    {
      category: "Grayscale",
      colors: [
        { name: "Gray 10%", hex: "#E6E6E6", rgb: "rgb(230, 230, 230)", hsl: "hsl(0, 0%, 90%)" },
        { name: "Gray 20%", hex: "#CCCCCC", rgb: "rgb(204, 204, 204)", hsl: "hsl(0, 0%, 80%)" },
        { name: "Gray 30%", hex: "#B3B3B3", rgb: "rgb(179, 179, 179)", hsl: "hsl(0, 0%, 70%)" },
        { name: "Gray 40%", hex: "#999999", rgb: "rgb(153, 153, 153)", hsl: "hsl(0, 0%, 60%)" },
        { name: "Gray 50%", hex: "#808080", rgb: "rgb(128, 128, 128)", hsl: "hsl(0, 0%, 50%)" },
        { name: "Gray 60%", hex: "#666666", rgb: "rgb(102, 102, 102)", hsl: "hsl(0, 0%, 40%)" },
        { name: "Gray 70%", hex: "#4D4D4D", rgb: "rgb(77, 77, 77)", hsl: "hsl(0, 0%, 30%)" },
        { name: "Gray 80%", hex: "#333333", rgb: "rgb(51, 51, 51)", hsl: "hsl(0, 0%, 20%)" },
      ]
    },
    {
      category: "Web Safe Colors",
      colors: [
        { name: "Aqua", hex: "#00FFFF", rgb: "rgb(0, 255, 255)", hsl: "hsl(180, 100%, 50%)" },
        { name: "Fuchsia", hex: "#FF00FF", rgb: "rgb(255, 0, 255)", hsl: "hsl(300, 100%, 50%)" },
        { name: "Lime", hex: "#00FF00", rgb: "rgb(0, 255, 0)", hsl: "hsl(120, 100%, 50%)" },
        { name: "Maroon", hex: "#800000", rgb: "rgb(128, 0, 0)", hsl: "hsl(0, 100%, 25%)" },
        { name: "Navy", hex: "#000080", rgb: "rgb(0, 0, 128)", hsl: "hsl(240, 100%, 25%)" },
        { name: "Olive", hex: "#808000", rgb: "rgb(128, 128, 0)", hsl: "hsl(60, 100%, 25%)" },
        { name: "Purple", hex: "#800080", rgb: "rgb(128, 0, 128)", hsl: "hsl(300, 100%, 25%)" },
        { name: "Teal", hex: "#008080", rgb: "rgb(0, 128, 128)", hsl: "hsl(180, 100%, 25%)" },
      ]
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const ColorSwatch = ({ hex }: { hex: string }) => (
    <div 
      className="w-6 h-6 rounded-md mr-2" 
      style={{ backgroundColor: hex, border: '1px solid rgba(0,0,0,0.1)' }}
    />
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Color Codes Reference</h1>
      <p className="text-gray-500 mb-8">
        A handy reference for common color codes in different formats. Click any code to copy it to your clipboard.
      </p>

      {colorGroups.map((group) => (
        <Card key={group.category} className="mb-8">
          <CardHeader>
            <CardTitle>{group.category}</CardTitle>
            <CardDescription>
              Click any code to copy to clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>HEX</TableHead>
                  <TableHead>RGB</TableHead>
                  <TableHead>HSL</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.colors.map((color) => (
                  <TableRow key={color.name}>
                    <TableCell><ColorSwatch hex={color.hex} /></TableCell>
                    <TableCell>{color.name}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        className="font-mono p-1 h-auto"
                        onClick={() => copyToClipboard(color.hex, `${color.name} HEX`)}>
                        {color.hex}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        className="font-mono p-1 h-auto"
                        onClick={() => copyToClipboard(color.rgb, `${color.name} RGB`)}>
                        {color.rgb}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        className="font-mono p-1 h-auto"
                        onClick={() => copyToClipboard(color.hsl, `${color.name} HSL`)}>
                        {color.hsl}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard(color.hex, `${color.name} HEX`)}>
                        <Copy size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}