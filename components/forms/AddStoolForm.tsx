import * as schema from "@/db/schema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Modal, SafeAreaView, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
interface AddStoolFormProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddStoolForm = ({ modalVisible, setModalVisible }: AddStoolFormProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const [formData, setFormData] = useState({
    timestamp: new Date().toISOString(),
    bristol: "4", // Default to middle of scale
    blood: false,
  });

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    try {
      console.log("Submitting form data:", formData);

      // Convert form data to match schema
      const entryData = {
        timestamp: formData.timestamp,
        bristol: parseInt(formData.bristol),
        amount: 3, // Default value for now
        wipe_only: 0,
        blood: formData.blood ? "visible" : "none",
        mucus: "none",
        urgency: "none",
        pain: 0,
        incomplete: 0,
        color: "brown",
        time_spent_minutes: null,
        notes: null,
        image_uri: null,
      };

      // await drizzleDb.insert(schema.stoolEntries).values(entryData);
      setModalVisible(false);
    } catch (error) {
      console.error("Error inserting entry:", error);
    }
  };

  const bristolOptions = [
    { value: "1", label: "Type 1", description: "Separate hard lumps" },
    { value: "2", label: "Type 2", description: "Lumpy and sausage like" },
    {
      value: "3",
      label: "Type 3",
      description: "A sausage shape with cracks in the surface",
    },
    {
      value: "4",
      label: "Type 4",
      description: "Like a smooth, soft sausage or snake",
    },
    {
      value: "5",
      label: "Type 5",
      description: "Soft blobs with clear-cut edges",
    },
    {
      value: "6",
      label: "Type 6",
      description: "Mushy consistency with ragged edges",
    },
    {
      value: "7",
      label: "Type 7",
      description: "Liquid consistency with no solid pieces",
    },
  ];

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView className="flex-1 bg-background">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <Text className="text-2xl font-semibold">Add Entry</Text>
          <Button
            variant="ghost"
            size="icon"
            onPress={() => setModalVisible(false)}
            className="h-10 w-10"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </Button>
        </View>

        <ScrollView className="flex-1 px-6">
          <View className="py-6 space-y-6">
            {/* Bristol Scale Section */}
            <Card>
              <CardHeader>
                <CardTitle>Bristol Stool Scale</CardTitle>
                <Text className="text-sm text-muted-foreground">
                  Select the type that best matches your stool
                </Text>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.bristol}
                  onValueChange={(value) => handleChange("bristol", value)}
                  className="space-y-3"
                >
                  {bristolOptions.map((option) => (
                    <View
                      key={option.value}
                      className="flex-row items-start space-x-3 py-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        className="mt-1"
                        aria-labelledby={`bristol-${option.value}`}
                      />
                      <View className="flex-1">
                        <Label
                          nativeID={`bristol-${option.value}`}
                          className="text-base font-medium"
                        >
                          {option.label}
                        </Label>
                        <Text className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Blood Section */}
            <Card>
              <CardHeader>
                <CardTitle>Blood Present</CardTitle>
                <Text className="text-sm text-muted-foreground">
                  Was there any visible blood?
                </Text>
              </CardHeader>
              <CardContent>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Label className="text-base">Blood detected</Label>
                    <Text className="text-sm text-muted-foreground">
                      {formData.blood
                        ? "Yes, blood was visible"
                        : "No blood detected"}
                    </Text>
                  </View>
                  <Switch
                    checked={formData.blood}
                    onCheckedChange={(checked) =>
                      handleChange("blood", checked)
                    }
                  />
                </View>
              </CardContent>
            </Card>
          </View>

          <Card>
            <CardHeader>
              <CardTitle>Date and Time</CardTitle>
              <Text className="text-sm text-muted-foreground">
                Current:{" "}
                {formatDateTime(
                  formData.timestamp ? new Date(formData.timestamp) : new Date()
                )}
              </Text>
            </CardHeader>
            <CardContent>
              <DateTimePicker
                value={
                  formData.timestamp ? new Date(formData.timestamp) : new Date()
                }
                mode="datetime"
                onChange={(event, date) => {
                  if (date) {
                    handleChange("timestamp", date.toISOString());
                  }
                }}
              />
            </CardContent>
          </Card>
        </ScrollView>

        {/* Footer Buttons */}
        <View className="px-6 py-4 border-t border-border bg-background">
          <View className="flex-row space-x-3">
            <Button
              variant="outline"
              onPress={() => setModalVisible(false)}
              className="flex-1"
            >
              <Text>Cancel</Text>
            </Button>
            <Button onPress={submitForm} className="flex-1">
              <Text>Save Entry</Text>
            </Button>
          </View>
        </View>

        {/* Date/Time Pickers */}
      </SafeAreaView>
    </Modal>
  );
};

export default AddStoolForm;
