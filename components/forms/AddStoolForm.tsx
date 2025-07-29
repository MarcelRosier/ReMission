import * as schema from "@/db/schema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Text } from "@/components/ui/text";
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { Checkbox } from "../ui/checkbox";
const AddStoolForm = ({ modalVisible, setModalVisible }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const [formData, setFormData] = useState({
    timestamp: "",
    bristol: "1",
    amount: "",
    wipe_only: "",
    blood: "none",
    mucus: "none",
    urgency: "none",
    pain: 0,
    incomplete: 0,
    color: "brown",
    time_spent_minutes: 0,
    notes: "",
    image_uri: null,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    try {
      console.log("Submitting form data:", formData);
      //   await drizzleDb.insert(schema.stoolEntries).values(formData);
      setModalVisible(false);
    } catch (error) {
      console.error("Error inserting entry:", error);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Add Entry</Text>
          {/* Form fields */}

          <Text>Bristol Scale (1-7):</Text>

          <RadioGroup
            value={formData.bristol}
            className="gap-3 bg-black"
            onValueChange={(value) => handleChange("bristol", value)}
          >
            <RadioGroupItem value="1" />
            <RadioGroupItem value="2" />
            <RadioGroupItem value="3" />
          </RadioGroup>
          <Text>Blood:</Text>
          <Checkbox
            checked={formData.blood === "yes"}
            onCheckedChange={(checked) =>
              handleChange("blood", checked ? "yes" : "no")
            }
          />
          <Text>Amount (0-5):</Text>
          <TextInput
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(text) => handleChange("amount", text)}
            style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
          />

          {/* Add other inputs similarly */}

          <DateTimePicker
            value={
              formData.timestamp ? new Date(formData.timestamp) : new Date()
            }
            mode="datetime"
            onChange={(event, date) =>
              handleChange("timestamp", date?.toISOString())
            }
          />

          <Button title="Save Entry" onPress={submitForm} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddStoolForm;
