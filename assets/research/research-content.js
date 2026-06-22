window.RESEARCH_CONTENT = [
  {
    slug: "surrogate-modeling",
    title: "Surrogate Modeling",
    shortTitle: "Surrogate Modeling",
    summary: "Application-driven surrogate models for expensive simulations, risk assessment, optimization, and uncertainty-aware prediction.",
    description: [
      [
        { text: "Surrogate model", strong: true },
        " is a mathematical model that approximates and replaces the outcome of complex physics-based simulation model. Surrogate model is useful when you need to run simulations multiple times, e.g., for risk assessment or optimizations. ",
        { text: "Scientific Machine learning", strong: true },
        " models can be used as a surrogate model, with the constraints of limited training data and the need for quantified uncertainty (epistemic and aleatoric) in the outputs."
      ],
      [
        "We develop ",
        { text: "application-driven surrogate models", strong: true },
        ", that sometimes push us to tackle emerging challenges related to large aleatory uncertainty, high-dimensionality, scalability, and limited computational resources."
      ]
    ],
    keywords: ["Stochastic emulations", "Adaptive design of experiments", "Sequential experimental design", "Gaussian Process (GP) model", "Dimension reduction"],
    applications: "Applications to earthquake, wind, (local) fire risk analysis and calibration of model parameters.",
    image: "assets/research/surrogate-overview.png",
    imageAlt: "Gaussian Process Surrogate Modeling",
    examples: [
      {
        title: "Stochastic emulation for seismic response",
        image: "assets/research/surrogate-stochastic-emulation.png",
        imageAlt: "Stochastic Emulation for predicting seismic response of structures",
        body: [
          [
            { text: "Stochastic emulation", strong: true },
            " is a class of surrogate models capable of predicting a probability distribution of model responses, as opposed to a single deterministic value. The uncertainty captured by stochastic emulation is referred to as aleatoric uncertainty. Accurately predicting this uncertainty is challenging but essential in many engineering applications, including hazard risk assessment. [",
            { text: "more", href: "#j-se1" },
            "]"
          ]
        ]
      },
      {
        title: "Adaptive and sequential design of experiments",
        image: "assets/research/surrogate-design-experiments.png",
        imageAlt: "Workflow of design of experiments",
        body: [
          [
            "When numerical simulation models are very expensive to run, generating a training dataset itself may require a prohibitive amount of computation. ",
            { text: "Adaptive and sequential selection of training points", strong: true },
            " can help us reduce the number of simulations needed to train a surrogate model, often resulting in computational savings of 50-90%. However, selection of optimal training points is a ",
            { text: "challenging optimization problem", strong: true },
            "."
          ],
          [
            "Various strategies are developed to balance between computational efficiency, robustness, and effectiveness. [",
            { text: "more", href: "#j-doe" },
            "]"
          ]
        ]
      },
      {
        title: "Exploration and exploitation in sequential design",
        image: "assets/research/surrogate-pareto.png",
        imageAlt: "Pareto front for design of experiments objective functions for surrogate modeling",
        body: [
          [
            "We can leverage the current training dataset to inform the ",
            { text: "optimal selection of upcoming training points", strong: true },
            ". We want to generate more samples of unseen events that are distant from existing samples (\"exploration\"), but also want to generate samples close to the existing samples that showed higher unpredictability (\"exploitation\"). It is important to balance the two desired criteria. [",
            { text: "more", href: "#j-doe" },
            "]"
          ]
        ]
      }
    ]
  },
  {
    slug: "resilience-assessment",
    title: "System-Reliability-based Resilience Assessment",
    shortTitle: "Resilience Assessment",
    summary: "Reliability, redundancy, and recoverability frameworks for probability-informed infrastructure resilience decisions.",
    description: [
      [
        { text: "Resilience", strong: true },
        " represents a modern paradigm in disaster management. Unlike the traditional risk and performance approaches, resilience also considers the long-term impacts of disasters, the ease of recovery, and the interactions among components and subsystems of urban systems across multiple scales. Therefore, resilience is inherently an interdisciplinary topic."
      ],
      [
        "Our group contributes to the resilience research community by providing a framework with strong ",
        { text: "uncertainty quantification", strong: true },
        " ",
        { text: "capabilities", strong: true },
        " that enable probability-informed decision-making."
      ]
    ],
    keywords: ["Reliability", "Redundancy", "Recoverability", "System-reliability-based resilience analysis", "Adaptive Sampling", "Surrogate modeling"],
    applications: "Applications to earthquake and (local) fire hazard for structural systems.",
    image: "assets/research/resilience-overview.png",
    imageAlt: "Resilience analysis",
    examples: [
      {
        title: "System-reliability-based resilience assessment",
        image: "assets/research/resilience-rrr.png",
        imageAlt: "Resilience, reliability, redundancy, and recoverability",
        body: [
          [
            "Resilience is evaluated using various measures such as robustness, rapidity, redundancy, and resourcefulness. Several definitions and algorithms exist for assessing resilience, and one of them is the ",
            { text: "system reliability-based resilience assessment", strong: true },
            ". [",
            { text: "more", href: "#j-resilience" },
            "]"
          ]
        ]
      },
      {
        title: "Failure paths across complex systems",
        image: "assets/research/resilience-reliability-redundancy.png",
        imageAlt: "Reliability and redundancy in resilience analysis",
        body: [
          [
            "A complex system like modern cities can have different system failure paths originating from different ",
            { text: "possible initial disruption scenarios", strong: true },
            ". The system-reliability-based resilience analysis method evaluates the resilience of a complex system by decomposing:"
          ]
        ],
        bullets: [
          ["How frequently each initial disruption may occur (", { text: "reliability", strong: true }, ");"],
          ["How likely the initial disruption is to lead to system failure (", { text: "redundancy", strong: true }, ");"],
          ["What are the socio-economic implications of the disruption scenario for the recovery process (", { text: "recoverability", strong: true }, ")."]
        ]
      },
      {
        title: "Reliability, redundancy, and recoverability indices",
        image: "assets/research/resilience-system-analysis.png",
        imageAlt: "System reliability based resilience analysis",
        body: [
          [
            "Reliability, redundancy, and recoverability indices collectively provide a concise snapshot of the ",
            { text: "criticality of different system failure modes", strong: true },
            " and inform engineering decision-making. [",
            { text: "more", href: "#j-resilience" },
            "]"
          ]
        ]
      },
      {
        title: "Adaptive importance sampling and surrogate-aided reliability",
        image: "assets/research/resilience-importance-sampling.png",
        imageAlt: "Importance sampling and surrogate-aided reliability analysis",
        body: [
          [
            "The resilience analysis is based on numerous 'what-if' scenario analysis and therefore, computationally expensive in nature. To overcome the computational challenges, advanced reliability methods, like ",
            { text: "adaptive importance sampling", strong: true },
            " or ",
            { text: "surrogate-aided reliability analysis methods", strong: true },
            " can be revisited and further developed. [",
            { text: "more", href: "#j-resilience-is" },
            "]"
          ]
        ]
      }
    ]
  },
  {
    slug: "regional-risk-assessment",
    title: "Regional Risk Assessment",
    shortTitle: "Regional Risk Assessment",
    summary: "Regional-scale UQ workflows for incomplete inventories, sparse hazards, sensitivity analysis, and resilience assessment.",
    description: [
      [
        "The recent trend toward ",
        { text: "regional-scale risk and resilience assessments", strong: true },
        " presents both challenges and opportunities for existing uncertainty quantification (UQ) methods. New challenges include limited information (e.g., incomplete inventory or sparse hazard description), high-dimensional representations of system input-output, inter- and intra-system dependencies, decision-making under uncertainty and conflicting objectives, and significant computational memory and processing demands."
      ],
      [
        "We are developing ",
        { text: "advanced UQ methods", strong: true },
        " to overcome the computational limitations of current state-of-the-art approaches."
      ]
    ],
    keywords: ["Probabilistic imputation", "Global Sensitivity analysis", "Post-disaster impact analysis"],
    applications: "Applications to regional hurricane (for inventory imputation) and earthquake risk/resilience assessment.",
    image: "assets/research/regional-overview.png",
    imageAlt: "Regional Scale Uncertainty Quantification",
    examples: [
      {
        title: "Open-source regional resilience workflows",
        image: "assets/research/regional-overview.png",
        imageAlt: "Regional Scale Uncertainty Quantification",
        body: [
          [
            { text: "NHERI SimCenter", strong: true, href: "https://simcenter.designsafe-ci.org/" },
            " (funded by NSF) provides excellent ",
            { text: "software applications", href: "https://simcenter.designsafe-ci.org/research-tools/r2dtool/" },
            " for regional resilience assessment and benchmark examples."
          ]
        ]
      },
      {
        title: "Sensitivity analysis for large-scale risk",
        image: "assets/research/regional-sensitivity.png",
        imageAlt: "Reduced order model global sensitivity analysis",
        body: [
          [
            "The collection of datasets is an emerging challenge in large-scale risk analysis. To address this, we must first understand what information is truly needed and what is not. A systematic and probabilistic ",
            { text: "sensitivity analysis", strong: true },
            " framework can offer valuable insights. [",
            { text: "more", href: "#j-rom-sensitivity" },
            "]"
          ]
        ]
      },
      {
        title: "Probabilistic imputation for incomplete inventories",
        image: "assets/research/regional-imputation.png",
        imageAlt: "Missing data imputation for regional risk assessment",
        body: [
          [
            "Regional-scale analyses often rely on public data sources, which may be imperfect. To address these information gaps, ",
            { text: "probabilistic imputation", strong: true },
            " techniques can be employed. When performing imputation, it is important to carefully assess the bias and uncertainty introduced and quantify their impact on downstream analyses."
          ]
        ]
      },
      {
        title: "Interdisciplinary post-hazard recovery demand",
        image: "assets/research/regional-recovery-demand.png",
        imageAlt: "Post hazard recovery resource demand model",
        body: [
          [
            "Disaster management is inherently interdisciplinary. Civil engineers play a unique role of leveraging hazard source information to predict potential structural damages. However, it is crucial for us to also understand the important assumptions made in ",
            { text: "upstream", strong: true },
            " of the workflow as well as the decision-making processes in ",
            { text: "downstream", strong: true },
            ", seeking ways to better inform decision-makers. Interdisciplinary collaboration is becoming increasingly vital. [",
            { text: "more", href: "#j-recovery" },
            "]"
          ]
        ]
      }
    ]
  },
  {
    slug: "random-vibrations-fields",
    title: "Random Vibrations and Random Fields",
    shortTitle: "Random Vibrations & Fields",
    summary: "Stochastic process and random field models for continuous uncertainty in hazards, response, and deterioration.",
    description: [
      [
        "Infinitely high-dimensional random variables are modeled as ",
        { text: "random fields", strong: true },
        " or ",
        { text: "processes", strong: true },
        ". In natural hazards engineering, we frequently encounter geospatially and temporally continuous randomness, necessitating methods to effectively model and propagate such uncertainty."
      ],
      "While high-dimensional uncertainty presents challenges (primarily computational limitations, but also informational limitations) the structured correlations inherent in these fields or processes allow for specialized treatment of uncertainties."
    ],
    keywords: ["Spectral representations", "Karhunen-Loeve expansion", "Equivalent linearization method", "First passage probability"],
    applications: "Applications to earthquake risk assessment and material corrosion.",
    image: "assets/research/random-overview.png",
    imageAlt: "Random vibrations and random fields",
    examples: [
      {
        title: "First-passage probability for random vibrations",
        image: "assets/research/random-first-passage.jpg",
        imageAlt: "First passage probability estimation using poisson branching model",
        body: [
          [
            "When a structural response is modeled as a random process, failure of the structure is often defined as ",
            { text: "the probability of response exceeding a threshold", strong: true },
            " during a finite time period. Identifying such a probability, called first-passage probability, is both a challenging and intriguing problem. [",
            { text: "more", href: "#j-fpp" },
            "]"
          ]
        ]
      },
      {
        title: "Equivalent linearization for nonlinear systems",
        image: "assets/research/random-linearization.png",
        imageAlt: "Gaussian mixture based equivalent linearization method",
        body: [
          [
            { text: "Equivalent linearization", strong: true },
            " is classical but powerful technique, as it allows us to leverage closed-form solutions, superposition principles, and other reliability analysis methods developed for linear(ized) systems. While classical linearization methods have well-known limitations in descriptive flexibility, modern linearization methods overcome the constraint while maintaining the computational benefits. [",
            { text: "more", href: "#j-gmelm" },
            "]"
          ]
        ]
      },
      {
        title: "Finite representations of random fields",
        image: "assets/research/random-field-pca.png",
        imageAlt: "Random field Principal component analysis",
        body: [
          [
            "A random field model consists of infinitely many dimensions but can always be approximated by a finite set of random variables. If your field model is ",
            { text: "well-structured", strong: true },
            " (e.g., exhibits slow correlation decay and is narrow-banded), the size of these random variables can be quite small. This ",
            { text: "low-dimensional representation", strong: true },
            " is useful in surrogate modeling, reliability analysis, sensitivity analysis, Bayesian updating, and various other uncertainty quantification (UQ) methods."
          ]
        ]
      }
    ]
  }
];

window.RESEARCH_INTRO = {
  title: "Research",
  body: [
    [
      "We develop computational ",
      { text: "Uncertainty Quantification (UQ)", strong: true },
      " methods, essential in optimal, uncertainty-aware decisions for ",
      { text: "resilient urban community.", strong: true }
    ]
  ],
  sourceUrl: "https://uncertainty.blogs.rice.edu/research/"
};
