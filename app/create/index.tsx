import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { colors } from '../../constants/colors'
import { Header } from '../../components/header/index'
import { Input } from '../../components/input'
import { Select } from '../../components/input/select'
import { useDataStore } from "../../store/data"
import { router } from "expo-router"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório"}),
  objective: z.string().min(1, { message: "O objetivo é obrigatório"}),
  level: z.string().min(1, { message: "Selecione seu nivel de treino"}),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  const genderOptions = [
    { label: "Masculino", value: "masculino"},
    { label: "Feminino", value: "feminino"},
  ]

  const levelOptions = [
    { label: "Sedentário (pouco ou nenhuma atividade física)", value: "Sedentário"},
    { label: "Levemente ativo (exercícios 1 a 3 vezes na semana)", value: "Levemente ativo"},
    { label: "Moderadamente ativo (exercćios 3 a 5 vezes na semana", value: "Moderadamente ativo"},
    { label: "Altamente ativo (exercćios de 5 a 7 vezes na semana", value: "Altamente ativo"},
    
  ]
  
  const objectiveOption = [
    { label: "Emagrecer", value: "emagrecer"},
    { label: "Hipertrofia", value: "hipertrofia"},
    { label: "Resistência física", value: "Resistência física"},
    { label: "Ganho de peso", value: "Ganho de peso"}

  ]

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    })

    router.push("/nitrition")
  }

  return (
    <View style={styles.container}>
      <Header 
        step='Passo 2'
        title='Finalizando dieta'
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>
          Sexo:
        </Text>
        <Select 
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo"
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>
          Selecione o seu nível de atividade física:
        </Text>
        <Select 
          control={control}
          name="level"
          placeholder="Selecione o seu nível"
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>
          Selecione o seu objetivo:
        </Text>
        <Select 
          control={control}
          name="objective"
          placeholder="Selecione o seu objetivo"
          error={errors.objective?.message}
          options={objectiveOption}
        />

        <Pressable 
          style={styles.button} 
          onPress={handleSubmit(handleCreate)}
        >
          <Text style={styles.buttonText}>
            Avançar
          </Text>
        </Pressable>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.background
  },
  label:{
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
