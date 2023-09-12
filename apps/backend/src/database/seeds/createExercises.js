exports.seed = async function (knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      name: 'Incline Barbell Bench Press',
      series: 4,
      repetitions: 12,
      group: 'chest',
      demo: 'supino_inclinado_com_barra.gif',
      thumb: 'supino_inclinado_com_barra.png'
    },
    {
      name: 'Flat Dumbbell Fly',
      series: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'crucifixo_reto.gif',
      thumb: 'crucifixo_reto.png'
    },
    {
      name: 'Flat Barbell Bench Press',
      series: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'supino_reto_com_barra.gif',
      thumb: 'supino_reto_com_barra.png'
    },
    {
      name: 'Dumbbell Skull Crushers',
      series: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'frances_deitado_com_halteres.gif',
      thumb: 'frances_deitado_com_halteres.png'
    },
    {
      name: 'Tricep Pushdown with Rope',
      series: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'corda_cross.gif',
      thumb: 'corda_cross.png'
    },
    {
      name: 'Tricep Pushdown with Bar',
      series: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'barra_cross.gif',
      thumb: 'barra_cross.png'
    },
    {
      name: 'Close-Grip Bench Press',
      series: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'triceps_testa.gif',
      thumb: 'triceps_testa.png'
    },
    {
      name: 'Deadlift',
      series: 3,
      repetitions: 12,
      group: 'back',
      demo: 'levantamento_terra.gif',
      thumb: 'levantamento_terra.png'
    },
    {
      name: 'Front Lat Pulldown',
      series: 3,
      repetitions: 12,
      group: 'back',
      demo: 'pulley_frontal.gif',
      thumb: 'pulley_frontal.png'
    },
    {
      name: 'Behind the Neck Lat Pulldown',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'pulley_atras.gif',
      thumb: 'pulley_atras.png'
    },
    {
      name: 'Bent Over Rows',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'remada_baixa.gif',
      thumb: 'remada_baixa.png'
    },
    {
      name: 'Dumbbell Rows',
      series: 4,
      repetitions: 12,
      group: 'back',
      demo: 'serrote.gif',
      thumb: 'serrote.png'
    },
    {
      name: 'Alternating Dumbbell Curl on Incline Bench',
      series: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'rosca_alternada_com_banco_inclinado.gif',
      thumb: 'rosca_alternada_com_banco_inclinado.png'
    },
    {
      name: 'Barbell Curl (Scott Curl)',
      series: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'rosca_scott_barra_w.gif',
      thumb: 'rosca_scott_barra_w.png'
    },
    {
      name: 'Straight Barbell Curl',
      series: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'rosca_direta_barra_reta.gif',
      thumb: 'rosca_direta_barra_reta.png'
    },
    {
      name: 'Standing Dumbbell Hammer Curl',
      series: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'martelo_em_pe.gif',
      thumb: 'martelo_em_pe.png'
    },
    {
      name: 'Wrist Curl',
      series: 4,
      repetitions: 12,
      group: 'forearm',
      demo: 'rosca_punho.gif',
      thumb: 'rosca_punho.png'
    },
    {
      name: 'Leg Press 45 Degrees',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'leg_press_45_graus.gif',
      thumb: 'leg_press_45_graus.png'
    },
    {
      name: 'Leg Extension',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'extensor_de_pernas.gif',
      thumb: 'extensor_de_pernas.png'
    },
    {
      name: 'Abductor Machine',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'abdutora.gif',
      thumb: 'abdutora.png'
    },
    {
      name: 'Stiff Leg Deadlift',
      series: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'stiff.gif',
      thumb: 'stiff.png'
    },
    {
      name: 'Neck Press',
      series: 4,
      repetitions: 10,
      group: 'shoulder',
      demo: 'neck-press.gif',
      thumb: 'neck-press.png'
    },
    {
      name: 'Machine Shoulder Press',
      series: 3,
      repetitions: 10,
      group: 'shoulder',
      demo: 'desenvolvimento_maquina.gif',
      thumb: 'desenvolvimento_maquina.png'
    },
    {
      name: 'Seated Dumbbell Lateral Raise',
      series: 4,
      repetitions: 10,
      group: 'shoulder',
      demo: 'elevacao_lateral_com_halteres_sentado.gif',
      thumb: 'elevacao_lateral_com_halteres_sentado.png',
    },
    {
      name: 'Dumbbell Shrug',
      series: 4,
      repetitions: 10,
      group: 'trapeze',
      demo: 'encolhimento_com_halteres.gif',
      thumb: 'encolhimento_com_halteres.png'
    },
    {
      name: 'Barbell Shrug',
      series: 4,
      repetitions: 10,
      group: 'trapeze',
      demo: 'encolhimento_com_barra.gif',
      thumb: 'encolhimento_com_barra.png'
    }
  ]);
};