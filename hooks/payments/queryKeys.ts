export const paymentsQueryKeys = {
  all: ['payments'] as const,
  methods: () => [...paymentsQueryKeys.all, 'methods'] as const,
  defaultMethod: () => [...paymentsQueryKeys.all, 'default'] as const,
};
